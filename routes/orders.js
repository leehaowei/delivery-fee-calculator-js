const express = require("express");
const router = express.Router();
const orderModel = require("../models/orderModel");
const OrderClass = require("../Order");
const calculator = require("../calculator")

// Direct to the page for fee calculation
router.get('/calculate', (req, res) => {
    res.render("index.ejs", {
        basePrice: calculator.BASE_DELIVERY_FEE
    })
})

// Create an order record and store to Mongodb Atlas
router.post('/fee', async (req, res) => {
    const data = req.body
    const cartValue = data.value
    const deliveryDistance  = data.distance
    const numberOfItems = data.items
    const time = data.time

    try {
        const orderOne = new OrderClass(cartValue, deliveryDistance, numberOfItems, time);
        const deliveryFee = calculator.getDeliveryFee(orderOne);
        res.send(`The delivery fee is: ${deliveryFee}`);

        const Fee = String(deliveryFee);
        const savedOrder = await orderModel.create({
            cartValue,
            deliveryDistance,
            numberOfItems,
            time,
            Fee
        })
        console.log(savedOrder)

        // res.status(200).json(savedOrder);
    } catch (error) {
        res.status(400).json({error: error.message});
    }

})

// Get all order records
router.get('/history', async (req, res) => {
    try {
        const orderHistory = await orderModel.find();
        res.status(200).json(orderHistory);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})


module.exports = router;