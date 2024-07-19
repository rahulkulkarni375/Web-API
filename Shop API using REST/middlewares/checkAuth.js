const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[2];
        // console.log(token);
        const decode = jwt.verify(token, 'AnythingIsOkayHere');
        req.userData = decode;
        next();
    }catch(err){
        res.status(401).json({message : 'Auth Failed in middleware'})
    }
}


// To check whether the JWT route is protected or not
// we have to first login then from their copy JWT 
// then go to route which is protected 
// then go to Auth -> Bearer Token then paste the JWT key 