const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const env = require('./environment');

let transporter = nodemailer.createTransport(env.smtp);

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