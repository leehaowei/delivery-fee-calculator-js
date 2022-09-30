const express = require("express")
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ordersRoute = require("./routes/orders");
require("dotenv/config");

app.set("view engine", "ejs")
app.use(express.static("static"))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Foodmorsa')
})

app.use(ordersRoute)
// app.get('/calculate', (req, res) => {
//     res.render("index.ejs", {
//         basePrice: calculator.BASE_DELIVERY_FEE
//     })
// })

// app.post('/fee', (req, res) => {
//     const data = req.body
//     const cartValur = data.value
//     const deliveryDistance  = data.distance
//     const numberOfItems = data.items
//     const time = data.time
//     const orderOne = new Order(cartValur, deliveryDistance, numberOfItems, time);
//     console.log(orderOne);
//     deliveryFee = calculator.getDeliveryFee(orderOne);
//     res.send(`The delivery fee is: ${deliveryFee}`);

// })

const port = process.env.POST;

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })


