const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');
const sendSMS = require('../utils/sendSMS');

// CREATE ORDER
exports.newOrder = asyncErrorHandler(async (req, res, next) => {

    let {
        shippingInfo,
        orderItems,
        paymentInfo,
        paymentMethod,
        totalPrice,
    } = req.body;

    if (typeof orderItems === "string") {
        try {
            orderItems = JSON.parse(orderItems);
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: "Invalid order items format",
            });
        }
    }

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No order items",
        });
    }

    if (paymentMethod === "CARD") {
        if (!paymentInfo || paymentInfo.status !== "succeeded") {
            return res.status(400).json({
                success: false,
                message: "Payment not completed",
            });
        }
    }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        paymentMethod,
        totalPrice,
        paidAt: paymentMethod === "CARD" ? Date.now() : undefined,
        user: req.user ? req.user._id : null,
    });

    const email = req.user?.email || shippingInfo?.email;
    const name = req.user?.name || shippingInfo?.name || "Customer";

    // 🔥 FIXED: NO AWAIT (background execution)
    if (email) {
        sendEmail({
            email: email,
            subject: "Order Confirmed",
            message: `
                <h2>Order Confirmed</h2>
                <p><b>Order ID:</b> ${order._id}</p>
                <p><b>Name:</b> ${name}</p>
                <p><b>Total:</b> ₹${totalPrice}</p>
                <p><b>Payment Method:</b> ${paymentMethod}</p>
            `,
        }).catch(err => console.log("EMAIL ERROR:", err));
    }

    const phone = shippingInfo?.phoneNo;

    if (phone) {
        sendSMS(
            phone,
            `Order placed! ID: ${order._id}, Amount: ₹${totalPrice}`
        ).catch(err => console.log("SMS ERROR:", err));
    }

    return res.status(201).json({
        success: true,
        order,
    });
});


// GET SINGLE ORDER
exports.getSingleOrderDetails = asyncErrorHandler(async (req, res, next) => {

    if (!req.params.id || req.params.id.length < 10) {
        return res.status(400).json({
            success: false,
            message: "Invalid Order ID",
        });
    }

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});


// USER ORDERS
exports.myOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find({ user: req.user?._id });

    res.status(200).json({
        success: true,
        orders,
    });
});


// ADMIN ALL ORDERS
exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find();

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


// UPDATE ORDER
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


// CANCEL ORDER
exports.cancelOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Delivered order cannot be cancelled", 400));
    }

    order.orderStatus = "Cancelled";

    for (const item of order.orderItems) {
        await updateStock(item.product, item.quantity);
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Order Cancelled",
    });
});


// STOCK UPDATE
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    if (!product) return;
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}


// DELETE ORDER
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