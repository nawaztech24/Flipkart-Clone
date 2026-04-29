const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');

// Create New Order
exports.newOrder = asyncErrorHandler(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        paymentMethod,
        totalPrice,
    } = req.body;

    // Validate items
    if (!orderItems || orderItems.length === 0) {
        return next(new ErrorHandler("No order items", 400));
    }

    // Validate payment (for CARD)
    if (paymentMethod === "CARD") {
        if (!paymentInfo || paymentInfo.status !== "succeeded") {
            return next(new ErrorHandler("Payment not completed", 400));
        }
    }

    // Create order safely
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        paymentMethod,
        totalPrice,
        paidAt: paymentMethod === "CARD" ? Date.now() : undefined,

        // Safe user assignment
        user: req.user ? req.user._id : null,
    });

    // Decide email source
    const email = req.user?.email || shippingInfo?.email;
    const name = req.user?.name || shippingInfo?.name || "Customer";

    // Send confirmation email (safe)
    if (email) {
        try {
            await sendEmail({
                email: email,
                subject: "Order Confirmed",
                message: `
                    <h2>Order Confirmed</h2>
                    <p><b>Order ID:</b> ${order._id}</p>
                    <p><b>Name:</b> ${name}</p>
                    <p><b>Total:</b> ₹${totalPrice}</p>
                    <p><b>Payment Method:</b> ${paymentMethod}</p>
                `,
            });
        } catch (err) {
            console.log("Email Error:", err.message);
        }
    }

    res.status(201).json({
        success: true,
        order,
    });
});


// Get Single Order Details
exports.getSingleOrderDetails = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});


// Get Logged In User Orders
exports.myOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find({ user: req.user?._id });

    if (!orders || orders.length === 0) {
        return next(new ErrorHandler("No Orders Found", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });
});


// Get All Orders (Admin)
exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find();

    if (!orders) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    });
});


// Update Order Status (Admin)
exports.updateOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Already Delivered", 400));
    }

    if (req.body.status === "Shipped") {
        order.shippedAt = Date.now();

        for (const item of order.orderItems) {
            await updateStock(item.product, item.quantity);
        }
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});


// Cancel Order
exports.cancelOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Delivered order can't be cancelled", 400));
    }

    if (order.orderStatus === "Cancelled") {
        return next(new ErrorHandler("Order already cancelled", 400));
    }

    order.orderStatus = "Cancelled";

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Order Cancelled Successfully",
    });
});


// Update Stock
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    if (!product) return;
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}


// Delete Order (Admin)
exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
    });
});