const express = require('express');
const mongoose = require('mongoose');
const app = express()
const url = "mongodb+srv://arenalorenzo2406:9eLz4piN3DzfwFqp@cluster0.phqxpkv.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
//Database connection
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connesso')).catch(err => console.error('errore MongoDB:', err))

//Routes
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRoutes.createUser)
app.use(orderRoutes.createOrder)
app.use(productRoutes.createProduct)


app.listen(5000, () => console.log('Server is running'))