const nodemailer = require('../config/nodemailer');

// creating a function which will send the e-mail
exports.newComment = (comment)=>{
    console.log("inside newComment mailer");

    // i need to send the mail
    nodemailer.transporter.sendMail({
        from : "naman.tyagi971@gmail.com",
        to : comment.user.email,
        subject : "New Comment Published",
        html : '<h1>Yup! Your comment is Published </h1>'
    },(err,info)=>{
        if(err)
        {
            console.log("error in sending mail",err);
            return;
        }
        console.log("Message Sent",info);
        return;
    })
}