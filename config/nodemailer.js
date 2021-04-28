const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'gmail.smtp.com',
    port : 587,
    secure: false,
    auth : {
        user : 'namantyagi15062000@gmail.com',
        pass : 'Sync@654321'
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
    });
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}