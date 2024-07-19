const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose =require('mongoose');

// Handling routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://rahulkulkarni375:5400@shopapi.e6cazmy.mongodb.net/?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Middlewares
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);

module.exports = app;