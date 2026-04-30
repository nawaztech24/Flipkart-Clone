const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: Number, required: true },
        phoneNo: { type: Number, required: true },
    },

    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true
            },
        },
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    // Payment Method
    paymentMethod: {
        type: String,
        required: true,
        enum: ["COD", "CARD"],
    },

    //  Payment Info
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
    },

    paidAt: {
        type: Date,
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },

    //  FIXED ORDER STATUS
    orderStatus: {
        type: String,
        required: true,
        default: "Ordered",
        enum: ["Ordered", "Shipped", "Delivered"],
    },

    //  Tracking Dates
    shippedAt: {
        type: Date,
    },

    deliveredAt: {
        type: Date,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model("Order", orderSchema);