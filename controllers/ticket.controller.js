


/**
 * Controller method for creating tickets 
 *      1. User is authenticated --- Taken care by middleware 
 *      2. Req body is valid -- Middleware 
 *      3. Insert the ticket body 
 */

const userModel = require("../models/user.model");

const ticketModel = require("../models/ticket.model");

exports.createTicket = async (req, res) => {

    try {
        //Create the ticketOject from the request body

        const reqObj = {
            title: req.body.title,
            ticketPriority: req.body.ticketPriority,
            description: req.body.description,
            status: req.body.status,
            reporter: req.body.userId //will be retrieved from the access token
        }

        /**
         * I need to assign one Engineer to this ticket 
         * 
         * Assignment :
         * Change the below code, to assign that Engineer, which has least num
         * of tickets assigned
         * 
         */
        const engineer = await userModel.findOne({
            userType: "ENGINEER",
            userStatus: "APPROVED"
        });
        if (engineer) {
            reqObj.assignee = engineer.userId;
        }

        const ticketCreated = await ticketModel.create(reqObj);

        if (ticketCreated) {

            /**
             * Need to update customer documents
             */
            const customer = await userModel.findOne({ userId: req.userId });

            customer.ticketsCreated.push(ticketCreated._id);

            await customer.save();

            /**
             * Update the Engineer document if assigned
             */
            if (engineer) {
                engineer.ticketAssigned.push(ticketCreated._id);
                await engineer.save();
            }

        
            /**
             *  We should call the notification service from here
             * 
             * We should write the logic of using node-rest-client in separate
             */
            
            sendNotificationReq(`Ticket created with id : ${ticketCreated._id}`, "Yay ticket created",`${customer.email},${engineer.email},kankvish@gmail.com`, "CRM_APP");
            res.status(201).send(ticketCreated);
        }
    } catch (err) {
        console.log("error while creating ticket ", err.message);
    }
}

// Method to fetch all the users 

exports.getTickets = async (req,res)=>{
    try{
    // Fetching the details from the user who is making the call 
     const userId = req.userId ;

     const callingUserObj = await userModel.findOne({userid : userId}); 

    // making query based on the type of the user 

    if(callingUserObj.userType == "CUSTOMER"){
        queryObj.reporter = req.userId ;
    }else if ( callingUserObj.userType == "ENGINEER"){
        queryObj.$or = [{reporter : req.userId}, {assignee :req.userId }]
        console.log(queryObj);
    }

    const tickets = TicketModel.find(queryObj);

    return res.status(200).send(tickets);
}catch(err){
        console.log("Error while fetching tickets", err.message);
        
        res.status(500).send({
            message : "Internal server error"
        })
}

}