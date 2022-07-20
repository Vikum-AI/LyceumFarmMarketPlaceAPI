const dotenv = require('dotenv');
dotenv.config(); 

const mongodb = require('mongodb').MongoClient
const express = require('express');

const mongoose = require('mongoose');

const Cors = require('cors');
const BodyParser = require('body-parser');
const morgan = require('morgan');

// Importing the schema
const Data = require('./models/data')
const Order = require('./models/order')

// Initializing 
const connectionstring = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PWD}@cluster0.ihznx.mongodb.net/?retryWrites=true&w=majority`
const app = express();
const router = express.Router({ mergeParams: true });
const PORT = process.env.PORT || 6700

// Connecting to the DB
mongoose.connect(connectionstring, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT))

    .catch((err) => console.error(err))


console.log('Deployment Successful')
console.log(`Server started at PORT ${PORT}`)

// Middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(Cors());
app.use(BodyParser.urlencoded({ extended: false }));


// /api endpoint that returns all the vegetables in the DB
app.get('/api', (req, res) => {

    Data.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })

})

app.post('/order', (req, res) => {

    const id = req.body

    Data.find({product_id: id})
        .then((result) => {
            Data.insertOne(result, (err, resu) => {
                if (err) {
                    console.error(err)
                    res.status(500).json({ err: err })
                    return
                }
                    console.log(resu)
                    res.status(200).json({ ok: true })
                })
        })

})

app.post('/additem', (req, res) => {

    const products = req.body
    console.log(products)

    Data.insertMany(products)
        .then( () => {
            console.log("Data inserted")
            res.send("Data Inserted successfully")
        })
        .catch( (err) => {
            console.error(err)
        })

})

app.post('/testing', (req, res) => {

    const products = req.body
    res.send(products)

})

app.post('/cart', (req, res) => {

    let products = req.body
    console.log(products)

    Order.insertMany(products)
        .then( () => {
            console.log("Data inserted")
            res.send("Data Inserted successfully")
        })
        .catch( (err) => {
            console.error(err)
        })

})

app.get('/admin', (req, res) => {

    Order.find()
        .then((result) => res.send(result))

})

app.get('/admin/:orderid', (req, res) => {

    const orderID = req.params.orderid

    Order.find({
        token: orderID
    })
        .then((result) => res.send(result))

})

