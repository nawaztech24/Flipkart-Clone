const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Please enter product description"]
    },

    highlights: [
        {
            type: String
        }
    ],

    specifications: [
        {
            name: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }
    ],

    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },

    cuttedPrice: {
        type: Number,
        required: [true, "Please enter cutted price"]
    },

    images: [
        {
            public_id: {
                type: String,
                default: "sample"
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    brand: {
        name: {
            type: String,
            default: "Generic"
        },
        logo: {
            public_id: {
                type: String,
                default: "sample"
            },
            url: {
                type: String,
                default: ""
            }
        }
    },

    category: {
        type: String,
        required: [true, "Please enter product category"]
    },

    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        default: 1
    },

    warranty: {
        type: String,
        default: "No Warranty"
    },

    returnPolicy: {
        isAvailable: {
            type: Boolean,
            default: false
        },
        days: {
            type: Number,
            default: 0
        }
    },

    replacement: {
        isAvailable: {
            type: Boolean,
            default: false
        },
        days: {
            type: Number,
            default: 0
        }
    },

    features: [
        {
            type: String
        }
    ],

    cod: {
        type: Boolean,
        default: true
    },

    assured: {
        type: Boolean,
        default: false
    },

    ratings: {
        type: Number,
        default: 0
    },

    numOfReviews: {
        type: Number,
        default: 0
    },

    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    
    section: [
        {
            type: String
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Product', productSchema);