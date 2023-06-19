const nodemailer = require("nodemailer");

//Öncelikle mail konfigürasyonumu yazıyorum
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type:'login',
        user: "c8657545@gmail.com",
        pass: "bcozssymjajpqicg",
    },
});

function confirmCodeEmail(userEMail, confirmCode){
    transporter.sendMail({
        from: 'c8657545@gmail.com',
        to: userEMail, 
        subject: "Confirm Code",
        text: "için confirm code: " + confirmCode, 
    });
}


module.exports = {
    confirmCodeEmail
}