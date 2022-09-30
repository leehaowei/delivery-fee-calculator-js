const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    cartValue: {
        type: String,
        required: true
    },
    deliveryDistance: {
        type: String,
        required: true
    },
    numberOfItems: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    },
    Fee: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Orders", OrderSchema);