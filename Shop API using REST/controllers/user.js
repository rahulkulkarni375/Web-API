const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userPostSignup = async(req,res) => {

    const em = req.body.email;
    const userAvailable = await User.findOne({email : em});
    console.log(userAvailable);
    if(userAvailable !== null){
        res.status(400).json({message : "User already exists"});
        console.log("Exists");

    }else{
        
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // console.log(`Hash: ${hash}`);
            const users =  new User({
                _id : new mongoose.Types.ObjectId(),
                email : req.body.email,
                password : hash
            }); 

            users.save()
            .then(result => {
                res.status(201).json({ 
                    message : `User is created ${result}` 
                });
            })
        })
    }
};

const userPostLogin =  async(req,res) => {
    const em = req.body.email;
    const userAvailable = await User.findOne({email : em});
    // console.log(userAvailable); 
    if(userAvailable == null){
      res.status(500).json({message : "User doest not exists in db"});
    }else{  
      bcrypt.compare(req.body.password,   userAvailable.password, (err,result) => {
        if(result){
          const accessToken = jwt.sign({
            user : {
              userid : userAvailable.email,
              password : userAvailable.password
            },
          },
          'AnythingIsOkayHere', //Secret Key  
          {
            expiresIn:"5m"
          }
        )
          res.status(200).json({
            messge : 'User Auth completed',
            user : accessToken});
        }else{
          res.status(500).json({
            message : 'User Auth Failed and Invalid credentials',
            error : err});
        }
        
      })
    }
  };

  const userDelete = async(req,res) => {
    const em = req.body.email;
    const userAvailable = await User.findOne({email : em});
  
    if(!userAvailable){
      res.status(500).json({message : "User does not exists"});
    }else{
      User.findByIdAndDelete(req.params.userId)
      .exec()
      .then(result => {
        res.status(200).json({message : "User deleted", result: result});
      })  
      .catch(err => {
      //   res.status(500).json({error : err});
      console.log("Catch err");
      })
    }
  };

  module.exports = {
    userPostSignup,
    userPostLogin,
    userDelete
  };