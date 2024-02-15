// starting point of the application 


const serverConfig = require("./config/server.config");
const dbConfig = require("./config/db.config");
const express = require("express");
const app = express(); 
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true})); 

// Connecting to database 

mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection; 

db.on('error', () => {
    console.log("Error while connecting to DB");
});

db.once("open", ()=>{
    console.log("Connected to database");
    // Write the logic to clean and initialize the DB 
   init();
})

async function init(){
    // Delete the user collection if it's already present 
    await User.collection.drop(); 

    const user = await User.create({
        name: "Vishwa", 
        userId : "vish01",
        password : bcrypt.hashSync("Welcome1", 8), 
        email : "kankvish01@gmail.com", 
        userType : "ADMIN"

    });
    console.log(user);

}

    
// Plugging the routes 
    require("./routes/auth.route")(app); 
    require("./routes/user.routes")(app); 
    require("./routes/ticket.route")(app);    

app.listen(serverConfig.PORT, () => {

    console.log("Server started on the port no : ", serverConfig.PORT ); 
})
    