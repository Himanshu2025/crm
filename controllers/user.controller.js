/**
 * This file will contain the logic to fetch all the users 
 *  1. User is valid 
 *  2. He should be ADMIN 
 * 
 *  Above validation should be f=done as a part of middleware 
 */

const userModel = require("../models/user.model");
const User = require("../models/user.model");

const objectConverter = require("../utils/ObjectConverter");

exports.findAll = async (req, res) => {
    try{

        // Read query params if any 

        const queryObj = {}; 

        const userTypeQ = req.query.userType ;

        if(userTypeQ = req.query.userType){

            queryObj.userType = userTypeQ;
        }

        const userStatusQ = req.query.userStatus ; 
         if(userStatusQ){
            queryObj.userStatus = userStatusQ;
         }
        
    const users = await User.find({});

    res.status(200).send(objectConverter.userResponse(users)); 
    
    }catch(err){

        console.log("Error while fetching users", err.message);
        
        res.status(500).send({
            message : "Internal server server error while fetching the users"
        })
    }


}


// Controller method to update the user record 
// 1.Only ADMIN and the owner should be allowed to update the record 

exports.update = async (req, res) => {
    try{
    /**
     * Fetch the user object if it's present
     */


    const user = await User.findOne({userId : req.params.id});

    if(!user){
        return res.status(404).send({
            message : "user with the given id to be updated is not found"
        })
    }


    /**
     * Update the user object based on the request 
     */

    user.name = req.body.name != undefined ? req.body.name : user.name;

    user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus;    

    user.name = req.body.userType != undefined ? req.body.userType : user.userType;
    /**
     *  Save the user object and return the updated object
     */
     const updateduser = await user.save();

    res.satus(200).send({
        name : updateduser.name,
        userId : updateduser.userId,
        userStatus : updateduser.userStatus,
        email : updateduser.email, 
        userType : updateduser.userType

    })

    }catch{

    }
}

