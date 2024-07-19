const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

//@desc user registration
//@route POST  /api/users/registration
//@access public 
const userRegistration =  asyncHandler(async(req,res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 15); //15 is total hash rounds
    console.log("hashedPassword : ", hashedPassword);

    const user = await User.create({
        username,
        email,
        password : hashedPassword
    });

    if(user){
        res.status(201).json({_id : user.id, email : user.email });
    }else {
        res.status(401);
        throw new Error("User data is not valid");
    }
    res.json({message : "Register the user"})
});

//@desc user login
//@route POST  /api/users/login
//@access public 
const userLogin =  asyncHandler(async(req,res) => {
    const {email, password} = req.body ;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email : user.email,
                id : user.id
            },
        },
        process.env.ACCESS_TOKEN_KEY,
        {expiresIn:"1m"}
    );
        res.status(200).json({ accessToken});
    }else{
        res.status(401);
        throw new Error("Email or Password is not valid");
    }
    res.json({message : "Please login here"})
});


//@desc user login
//@route GET  /api/users/current
//@access private 
const userCurrent =  asyncHandler(async (req,res) => {
    res.json(req.user);
});


module.exports = { userRegistration, userLogin, userCurrent } ;