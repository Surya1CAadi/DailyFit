const nodemailer = require("nodemailer");

const sendEmail = async options => {

    //1.create a transporter=> a service that will send the email, node itself won't.
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });


    //2.define email options
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: options.email,
        subject: options.subject,
        html: options.html
    }


    //3.actually send the email with nodemailer
    await transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(err);
            console.log(`Email was not sent to ${options.email}!`);
        } else {
            console.log(`Email sent successfully to ${options.email}!`);
        }
    });

    return true;
}

const sendContactEmail = async options => {

    //1.create a transporter=> a service that will send the email, node itself won't.
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST_CONTACTUS, port: process.env.EMAIL_PORT_CONTACTUS, secure: false, auth: {
            user: process.env.EMAIL_USERNAME_CONTACTUS, pass: process.env.EMAIL_PASSWORD_CONTACTUS,
        },
    });


    //2.define email options
    const mailOptions = {
        from: "jigyashusaini7@gmail.com", to: options.email, subject: options.subject, html: options.html
    }


    //3.actually send the email with nodemailer
    await transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(`Email was not sent to ${options.email}!`);
        } else {
            console.log(`Email sent successfully to ${options.email}!`);
        }
    });

    return true;
}


//this is supposed to throw an error on failure
const sendPasswordResetEmail = async options => {

    //1.create a transporter=> a service that will send the email, node itself won't.
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, port: process.env.EMAIL_PORT, secure: false, auth: {
            user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD,
        },
    });

    //2.define email options
    const mailOptions = {
        from: process.env.EMAIL_USERNAME, to: options.email, subject: options.subject, html: options.html
    }

    //3.actually send the email with nodemailer
    await transporter.sendMail(mailOptions);
}

module.exports = {sendEmail, sendContactEmail, sendPasswordResetEmail};