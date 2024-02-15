/**
 * 
 * Middleware to validate the access token
 */

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const userModel = require("../models/user.model");

const verifyToken = (req, res, next) => {
    /**
     * check if the token is present
     */

    const token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message : "No token provided"
        }); 
    }

    /**
     * If token is valid 
     */

    jwt.verify(token,config.secret,(err, decoded)=>{
        if(err){
         return res.status(410).send({
            message : "Invalid Token"
         });

        }
        console.log("Token is valid"); 
        

        /**
         * Fetch the userId from token and set it to the request object 
         */
        req.userId = decoded.indexOf; //decoded.id is the userId
        next(); 
    })

    
}



/**
 * 
 * Middleware to go and check if the user is ADMIN
 */


const isAdmin = async(req, res, next) => {

    const user = userModel.findOne({userId : req.userId});


    if(user && user.userType == "ADMIN"){
        next(); 
    }else{
        return res.status(403).send({
            message : "Only ADMIN user allowed"
        })
    }

}

// Middleware check the use is ADMIN or the owner 

const isAdminOrOwner = async (req, res, next) => {

    const callingUser = await UserActivation.findOne({ userId : req.userId});

    if (callingUser.userType == "ADMIN" || callingUser.userId == req.params.id){

        if(req.body.userStatus && callingUser.userType != 'ADMIN'){
            return res.status(403).send({
                message : "Only ADMIN is allowed to change the status"
            }); 
        }
    }
    const user = await UserActivation.findOne({userId : req.userId}); 
    
    if(user.userType == "ADMIN" || user.userId == req.params.id){
            next()
    }else{
        return res.status(403).send({
            message: "Only ADMIN or owner of the resource id allowed"
        })

    }
}

module.exports = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isAdminOrOwner : isAdminOrOwner
}