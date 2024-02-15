const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true
    },

    ticketPriority : {
        type : Number, 
        ref: "ticketSchema",
        required : true,
        default : 4
    },

    description : {
        type : String, 
        ref: "ticketSchema",
        required : true
    },
    status : { 
    type: String, 
    required : true,
    default : "OPEN",
    enum : ["OPEN", "IN_PROGRESS", "CLOSED"]
    },
    reporter : {
        type : String, 
        required : true
    },
    assignee : {
        type : String
    },
    createdAt : {
        type : Date, 
        deafult : ()=> {
            return Date.now();
        }
    },
    updatedAt : { 
        type : Date, 
        default : () => {
            return Date.now(); 
        }
        
    }

});


module.exports =  mongoose.model("Ticket", ticketSchema); 