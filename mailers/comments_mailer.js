const nodemailer = require('../config/nodemailer');

// creating a function which will send the e-mail
exports.newComment = (comment)=>{
    let htmlString = nodemailer.renderTemplate({comment : comment},'/comments/new_comment.ejs');
    // i need to send the mail
    nodemailer.transporter.sendMail({
        from : 'naman.tyagi971@gmail.com',
        to : comment.user.email,
        subject : "New Comment Published",
        html : htmlString
    },(err,info)=>{
        if(err)
        {
            console.log("error in sending mail",err);
            return;
        }
        console.log("Message Sent",info);
        return;
    });
}