const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    data: {
        type: Date,
        default: Date.now,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model('Order', orderSchema)