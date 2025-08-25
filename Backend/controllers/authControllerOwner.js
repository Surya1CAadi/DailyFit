const catchAsync = require("../util/catchAsync");
const jwt = require("jsonwebtoken"); //token token token babe '>'
const AppError = require("../util/appError");
const {promisify} = require('util');
const sendEmail = require("../util/email");
const crypto = require("crypto");
const Owner = require("../model/OwnerModel");
const User = require("../model/UserModel");
const {getPasswordResetHtml} = require("../emailHtml/variousHtml");
const {isInDev, isInProd} = require("../util/usefulFunctions");
const {sendPasswordResetEmail} = require("../util/email");

//returns a jwt token created using given id
const signToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET);
}

//creates a jwt token using user's _id, put it into a cookie and send it as response
//ok
const createSendToken = (owner, status, res) => {
    const token = signToken(owner._id);

    //hide password as we are not 'selecting' user == password is still in user object
    owner.password = undefined;

    //set cookies
    const options = process.env.NODE_ENV === "development" ? {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
    } : {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        domain: ".ducklingfit.com"
    };
    res.cookie("jwtOwner", token, options);


    res.status(status).json({
        status: 'success', token, data: {
            owner: owner
        }
    });
}

exports.signup = catchAsync(async (req, res, next) => {

    //todo: we are checking for email id only, check for phone too
    if (!req.body.email) return next(new AppError("Email id not provided", 400));

    // check if the user already exists
    const existingOwner = await Owner.findOne({email: req.body.email});
    if (existingOwner) {
        return res.status(401).json({
            status: "fail", message: "email id already registered",
        });
    }

    //not simply using req.body due to security reasons
    const newOwner = await Owner.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        phone: req.body.phone,
        gym: req.body.gym
    });

    res.status(200).json({
        status: "successes", data: {owner: newOwner}
    });

});

exports.login = catchAsync(async (req, res, next) => {
    let {loginField, password} = req.body;

    //check if email and password exists => user entered these fields
    if (!loginField || !password) {
        return next(new AppError("Please provide phone number/email and password", 400));
    }

    //check if user exists and password is correct
    //we have restricted the default selection of password, so we explicitly select password
    const filter = loginField.includes("@") ? {email: loginField} : {phone: loginField};

    let owner = await Owner.findOne(filter).select('+password');

    if (!owner || !(await owner.correctPassword(password, owner.password))) return next(new AppError("Incorrect phone number/email or password!", 401));

    owner = {...owner}._doc;

    createSendToken(owner, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
    const options = process.env.NODE_ENV === "development" ? {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
    } : {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        domain: ".ducklingfit.com"
    };
    res.cookie("jwtOwner", "", options).json({
        status: "success", message: "cookie deleted"
    })

});

//makes sure that user is logged in == has a valid bearer token
//if all is good, that user is added to the req
exports.protect = catchAsync(async (req, res, next) => {
    let token = req.cookies.jwtOwner;

    // check if there is a token
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError("You are not logged in! Please log in again.", 401));
    }

    // verify the token
    //verify also accepts a callback function, but we will make it return a promise
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if user still exists => to check the case if user has jwt token but the user was deleted!
    const freshOwner = await Owner.findOne({_id: decoded.id});
    if (!freshOwner) {
        return next(new AppError("The gym owner belonging to this token does not exist.", 401));
    }

    // check if user changed password after jwt was issued
    if (freshOwner.changePasswordAfter(decoded.iat)) {
        return next(new AppError("Gym Owner recently changed their password! Please login again.", 401));
    }

    //grant access to the protected rout
    //also add this user to the request object
    req.owner = freshOwner;
    next();
});


///////////The method below are unchecked///////////////

exports.isLoggedIn = catchAsync(async (req, res, next,) => {
    let token = req.cookies.jwtOwner;

    // check if there is a token
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError("You are not logged in! Please log in again.", 401));
    }

    // verify the token
    //verify also accepts a callback function, but we will make it return a promise
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if user still exists => to check the case if user has jwt token but the user was deleted!
    const freshUser = await User.findOne({_id: decoded.id});
    if (!freshUser) {
        return next(new AppError("The user belonging to this token does not exist.", 401));
    }

    // check if user changed password after jwt was issued
    if (freshUser.changePasswordAfter(decoded.iat)) {
        return next(new AppError("User recently changed their password! Please login again.", 401));
    }

    res.status(200).json({
        status: "success", token, data: {
            freshUser,
        }
    })

});

//to send an email to owner when he forget the password
exports.forgotPassword = catchAsync(async (req, res, next) => {

    let {credential} = req.body;

    //check if email and password exists => owner entered these fields
    if (!credential) {
        return next(new AppError("Please provide phone number or email", 400));
    }

    //check if owner exists and password is correct
    //we have restricted the default selection of password, so we explicitly select password
    const filter = credential.includes("@") ? {email: credential.trim().toLowerCase()} : {phone: credential};

    //get owner based on posted email or phone number
    const owner = await Owner.findOne(filter);

    //link is the link of client page
    if (!owner) {
        return next(new AppError("No owner with these credentials.", 404));
    }

    //generate token
    const resetToken = owner.createPasswordResetToken();

    //validation is set false because few fields such as password and confirm password is not provided by the owner
    //so save without validation
    await owner.save({validateBeforeSave: false});

    //send it to owner's email
    const resetUrl = `${(process.env.NODE_ENV === "development" ? "http://localhost:5173" : "www.ducklingfit.com")}/owner/forgotPassword/${resetToken}`;
    const html = getPasswordResetHtml(owner.name, resetUrl);

    if (isInDev()) {
        console.log("in db: " + owner.passwordResetToken);
        console.log(resetUrl);
    }

    try {
        if (isInProd()) await sendPasswordResetEmail({
            email: owner.email, subject: "Reset password token. Valid for 10 min only!", html
        });

        res.status(200).json({
            status: 'success', message: 'Link to change password sent to your email!'
        })
    } catch (err) {
        //if failed to send the email, set these fields to undefined
        owner.passwordResetToken = undefined;
        owner.passwordResetExpires = undefined;
        await owner.save({validateBeforeSave: false});
        return next(new AppError('There was an error sending you email! Please try again later!', 500));
    }
});

//to reset the password using password reset link
exports.resetPassword = catchAsync(async (req, res, next) => {

    //1. get owner based on token
    //we stored hashed resetToken in database, so hash the resetToken that owner gave to compare
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");


    //get owner based on the resetToken and also make sure that token is not expired yet
    const owner = await Owner.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()}});

    if (isInDev()) console.log(req.params.token, hashedToken);

    //2. if token is not expired and there is a owner then set new password
    if (!owner) return next(new AppError('Token is invalid or has expired. Please request a new one!', 400));
    owner.password = req.body.password;
    owner.passwordConfirm = req.body.passwordConfirm;
    owner.passwordResetToken = undefined;
    owner.passwordResetExpires = undefined;
    await owner.save(); //pre save functions will check if password and confirm password matches

    //3. updated password changed property of owner
    //done in pre('save'.... middleware in ownerModel

    //4. log the owner in, send jwt
    createSendToken(owner, 200, res);
});


//owner can change his password using current password
exports.updateMyPassword = catchAsync(async (req, res, next) => {
    //1. get owner from the collection
    //this is only accessible after owner login => req has owner object

    if (!req.body.password) return next(new AppError("Please provide current password!", 400));

    const owner = await Owner.findById(req.owner._id).select('+password');

    //2. check if posted password is correct
    if (!owner || !(await owner.correctPassword(req.body.password, owner.password))) {
        return next(new AppError("Incorrect Password!", 401));
    }

    //3. update password
    owner.password = req.body.newPassword;
    owner.passwordConfirm = req.body.passwordConfirm;
    await owner.save(); //pre-save functions in ownerModel will check if password and confirm password matches

    //4. log in using new password
    createSendToken(owner, 200, res);
});
