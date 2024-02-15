

const auth = require("../middlewares/authjwt");

const ticketController = require("../controllers/ticket.controller");

const ticketValidator = require("../middlewares/ticket.middleware");
module.exports = (app) => {

    /**
     * 
     * Creating a ticket 
     * 
     * POST /crm/api/v1/tickets
     */

    app.post("/crm/api/v1/tickets", [auth.verifyToken, ticketValidator.validateTicketReqBody],ticketController.createTicket);

    // Fetching all the tickets 

    app.get("/crm/api/v1/tickets",[auth.verifyToken], ticketController.getTickets);
    
}