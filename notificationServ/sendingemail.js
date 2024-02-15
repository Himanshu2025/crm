// This file will contain the sample logic to send the e-mail 


const nodemailer = require("nodemailer"); 

/**
 *  configuring the transporter for sending email 
 */

const transporter = nodemailer.createTransport({

    host : "smtp.gmail.com", 
    port : 465, 
    auth : {
        user : "hkulkarni927@gmail.com",
        pass : *******
    },
    secure : true 

}); 

/**
 * 
 * Write the code to send email 
 */

const mailObj = {
    from : 'crm-noreply@gmail.com',
    to : 'hkul0004@student.monash.edu,himancoolkarni2000@gmail.com',
    subject: "Testing code - for sending email",
    text: "Sample text content of the email"
}



transporter.sendMail(mailObj, (err, data)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("Email was sent successfully");
    }
})
