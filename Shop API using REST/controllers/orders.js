const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Products = require('../models/products');
const orders = require('../models/orders');

const orderGetAll = (req, res) => {
    orders.find()
    .populate('product') //This will include all the details of that product from "Product" document into the order document list 
    .exec()
    .then(result => {
        res.status(200).json({
            message : 'Order is placed',
            order : result
        });
    })
    .catch(err => {
        res.status(500).json({error : err});
    });
};

const orderPost = (req, res) => {
    Products.findById(req.body.productId)
    .then(prod => {
        if(!prod){
            return res.status(404).json({message : 'Product not found'});
        }  
            const orders = new orders({
            _id : new mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            product : req.body.productId
        });
    })
    return orders.save()
    .then(result => {
        res.status(201).json({
            message : 'Order stored',
            createdOrder : {
                _id : result._id,
                product : result._id,
                quantity : result.quantity
            }
        });
    })
    .catch(err => {
        res.status(500).json({error : err}); 
    })
};

const orderGetOne = (req, res) => {
    orders.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(result => {
        // console.log(result);
        res.status(200).json({result})  
    })
    .catch(err => {
        res.status(500).json({message : 'Your order not found'});
    })
};

const orderDelete =  (req, res) => {

    const id = req.params.orderId;
    orders.findByIdAndDelete(id) 
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({error : err})
    });
};

module.exports = {
    orderGetAll,
    orderPost,
    orderGetOne,
    orderDelete
};