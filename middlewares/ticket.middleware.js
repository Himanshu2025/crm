const User = require("../models/user.model");
const ticket = require("../models/ticket.model");


const validateTicketReqBody = (req, res, next) => {

    if (!req.body.title){
        return res.status(400).send({
            message : "Title of the ticket is missing"
        });
    }
    if (!req.body.description){
        return res.status(400).send({
            message : "Description of the ticket is missing"
        });
    }

    if( req.body.status != undefined){
        if(["OPEN", "IN_PROGRESS","CLOSED"].includes(req.body.status)){
                 return res.status(400).send({
                    message: "Not a valid status"
                 })   
        }
    }

    next(); 
}

const isEligibleToUpdate = async (req, res, next ) => {

    // Write the logic to check if the calling user is eligible to update the ticket 

    const callingUser = await UserActivation.findOne({userId : req.userId});

    if(!ticket){
        return res.status(400).send({
            message : "Ticket id passed is incorrect"
        });
    }

    const ticket = await Ticket.findOne({_id: req.params.id })

    if(callingUser.userType == "CUSTOMER"){
        if(ticket.reporter != callingUser.userId){
           return res.status(400).send({
                message : "User is not allowed to update the ticket"
           });
        }else if(callingUser.userType == "ENGINEER"){
            if(ticket.repoter != callingUser.userId && ticket.assignee != callingUser.userId){
                return res.status(400).send({
                    message : "User is not allowed to update the ticket"
                })
            }

            
        }
    }

    next();
}


module.exports = {
    validateTicketReqBody : validateTicketReqBody,
   
}
