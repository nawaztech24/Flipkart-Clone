const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    //  User Email
    email: {
        type: String,
        required: true,
    },

    //  Payment Method (अब सिर्फ COD / ONLINE demo)
    paymentMethod: {
        type: String,
        required: true,
        enum: ["COD", "ONLINE"],
    },

    //  Payment Info (basic)
    paymentInfo: {
        id: String,
        status: String,
    },

    //  Order ID (link with order)
    orderId: {
        type: String,
        required: true,
    },

    //  Amount
    amount: {
        type: Number,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model("Payment", paymentSchema);