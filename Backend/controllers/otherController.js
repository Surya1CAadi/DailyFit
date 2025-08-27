const catchAsync = require("../util/catchAsync");
const {sendContactEmail} = require("../util/email");
const AppError = require("../util/appError");

exports.sendContactEmail = catchAsync(async (req,res, next)=>{

    const {name, email, message} = req.body;

    if (!name || !email || !message){
        return next(new AppError("some fields are missing!", 400));
    }

    sendContactEmail({
        email: "jigyashusaini07@gmail.com", subject: `${name} | ${email} | is trying to contact you!`, html: message
    });

    sendContactEmail({
        email: "shashirathee62682@gmail.com", subject: `${name} | ${email} | is trying to contact you!`, html: message
    });

    res.status(200).json({
        status: "success",
        message: "email requested!"
    })

});


//todo: complete this function
exports.sendCallRequest = catchAsync(async (req,res, next)=>{

    if (!name || !email || !message){
        return next(new AppError("some fields are missing!", 400));
    }

    sendContactEmail({
        email: "jigyashusaini07@gmail.com", subject: `${name} | ${email} | is trying to contact you!`, html: message
    });

    sendContactEmail({
        email: "shashirathee62682@gmail.com", subject: `${name} | ${email} | is trying to contact you!`, html: message
    });

    res.status(200).json({
        status: "success",
        message: "email requested!"
    })

});