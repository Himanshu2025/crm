// This file will have the logic to sign-up and sign-in users 

/**
 * Create a function to allow the user to sign up 
 * 
 * Whenever a user calls the endpoint : 
 * 
 * POST /crm/api/v1/signup , router should call the below method
 * JSON request body to be available as body JS object  
 */

const bcrypt = require("bcryptjs"); 
const User = require("../models/user.model")
const jwt = require("jsonwebtoken"); 
const authConfig = require("../config/auth.config");

exports.signup = async (req, res )=> {
    // Logic to handle the signup

    // First read the request body and create the JS object to be inserted in the DB 



try{
const userObj = {
    name : req.body.name, 
    userId : req.body.userId,
    email : req.body.email, 
    userType : req.body.userType,
    password : bcrypt.hashSync(req.body.password , 8 )
}

// Set the user status 

if(!userObj.userType || userObj.userType == ("CUSTOMER") || ("ENGINEER") ){
    userObj.userStatus = "APPROVED"; 
}else{
    userObj.userStatus = "PENDING"; 
}

// Insert data into database 

const savedUser = await User.create(userObj); 
const postResponse = {
    name : savedUser.name, 
    userId : savedUser.userId, 
    email : savedUser.email,
    userType : savedUser.userType, 
    userStatus : savedUser.userStatus, 
    createdAt : savedUser.createdAt,
    updatedAt : savedUser.updatedAt
}

// Return the success response to the customer 

res.status(201).send(postResponse);
}catch(err){
    console.log("Error while registering user ", err.message); 
    res.status(500).send({
         message : "Some internal server error"
    })
}
}

// Controller code for login 

exports.signin = async (req, res)=> { 
    try{
    /**
     * 1.  Read the userId and password from the request
     */ 
        const userIdFromReq = req.body.userId ; 
        const password = req.body.password; 

    // 2. Ensure the Userid is valid 

        const userSaved =  await User.findOne({userId : userIdFromReq })


     if(!userSaved){
        return res.status(401).send({
            message : "User id passed is not correct"
        })
     }

     // 3. Ensure that the password is valid 
     /**
      * plain text password 
      * in DB we have encrypted password ..bcrypt 
      */

     const isValidPassword = bcrypt.compareSync(password, userSaved.password); 

     if(!isValidPassword){
        return res.status(401).send({
            message: "Incorrect password !"
        })
     }
    // 4. Check if the user is a valid user 
     if(userSaved.userStatus != "APPROVED"){
            return res.status(403).send({ 
                message : "User is not approved for the login"
            });
     }
    
     // 5. We need to generate the JWT based access token 
        const token = jwt.sign({
            id : userSaved.userId
        }, authConfig.secret,{
            expiresIn : 600
        })

      
     // 6. Send the response back 
     res.status(200).send({
        name : userSaved.name, 
        userId : userSaved.userId, 
        email : userSaved.email, 
        userType : userSaved.userType, 
        userStatus : userSaved.userStatus,
        accessToken : token
     
     }); 
     
    }catch(err){
        console.log("Error while login", err.message)
        res.status(500).send({
            message : "Internal Server Error"
        })
    }

}
