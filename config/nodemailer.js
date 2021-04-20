const nodemailer = require('nodemailer');
const path = require('path');

let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'gmail.smtp.com',
    port : 587,
    secure: false,
    auth : {
        user : 'knowme587@gmail.com',
        pass : 'Codingninjas'
    }
});

let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(path.join(__dirname,'../views/mailers',relativePath),
    data,function(err,templates){
        if(err)
        {
            console.log("error in rendering templates",err);
            return;
        }
        mailHTML = templates;
    }
    );
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}