const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');


const productGet = (req,res) => {
    Product.find().exec()               //The exec method executes the query asynchronously and returns a promise.
    .then(result => {
        // console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({error : err});
    });
};

const productPost = (req,res) => {
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    product.save()
    .then(result => {
        // console.log(result);
        res.status(201).json({
            message : "Product is created",
            product : product
        });
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({error : err})
    })
};

const productGetOne = (req,res) => {
    const id = req.params.productsId;
    Product.findById(id).exec()
    .then(result => {
        res.status(200).json({result});
    })
    .catch(err => {
        console.log("Error : ",err);
        res.status(500).json(err);
    });
};

const productPatch = (req,res) => {
    const id = req.params.productsId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.findOneAndUpdate({_id : id}, {$set : updateOps})
    .exec()
    .then(result => {
        // console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({
            error : err
        });
    });
};

const productDelete = (req,res)=> {
    const id = req.params.productsId;
    Product.findByIdAndDelete({_id : id}) 
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
    productGet,
    productPost,
    productGetOne,
    productPatch,
    productDelete
};