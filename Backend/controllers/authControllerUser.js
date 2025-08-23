const catchAsync = require("../util/catchAsync");
const jwt = require("jsonwebtoken"); //token token token babe '>'
const AppError = require("../util/appError");
const {promisify} = require('util');
const {sendEmail, sendPasswordResetEmail} = require("../util/email");
const crypto = require("crypto");
const User = require("../model/UserModel");
const {getHtmlForOtp, getHtmlForWelcome, getPasswordResetHtml} = require("../emailHtml/variousHtml");
const {isInDev, isInProd} = require("../util/usefulFunctions");

//returns a jwt token created using given id
const signToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET);
}

//creates a jwt token using user's _id, put it into a cookie and send it as response
//ok
const createSendToken = (user, status, res) => {
    const token = signToken(user._id);

    //hide password as we are not 'selecting' user == password is still in user object
    user.password = undefined;
    user.emailVerificationOtp = undefined

    //set cookies
    const options = process.env.NODE_ENV === "development" ? {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), httpOnly: true, secure: false,
    } : {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        domain: ".ducklingfit.com"
    };
    res.cookie("jwt", token, options);


    res.status(status).json({
        status: 'success', token, data: {
            user
        }
    });
}

//to sing up the user
//checked
exports.signup = catchAsync(async (req, res, next) => {

    if (!req.body.email) return next(new AppError("Email id not provided", 400));

    const otp = Math.floor(1000 + Math.random() * 9000);

    // check if the user already exists
    const existingUser = await User.findOne({email: req.body.email});
    if (existingUser) {
        if (existingUser.isEmailVerified === false) {
            await User.findByIdAndDelete({_id: existingUser.id});
        } else return res.status(401).json({
            status: "fail", message: "email id already registered",
        });
    }

    //not simply using req.body due to security reasons
    const newUser = await User.create({
        email: req.body.email.trim().toLowerCase(),
        name: req.body.name,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        emailVerificationOtp: otp,
        phone: req.body.phone
    });

    await sendEmail({
        email: newUser.email, subject: "Welcome to DucklingFit.com! Please verify your email", html: getHtmlForOtp(otp)
    });

    res.status(200).json({
        status: "successes", data: {phone: newUser.phone, email: newUser.email, name: newUser.name}
    })
});

//checked
exports.verifyEmail = catchAsync(async (req, res, next) => {
    const {email = email.trim().toLowerCase(), emailVerificationOtp} = req.body;

    if (!email || !emailVerificationOtp) return res.status(400).json({
        status: "fail", message: "Please enter OTP"
    });

    const user = await User.findOne({email}).select("+emailVerificationOtp");
    if (!user) return res.status(406).json({
        status: "fail", message: "No user with this email id"
    });

    if (user.isEmailVerified) return res.status(200).json({
        status: "success", message: "user already verified"
    });

    if (user.emailVerificationOtp === emailVerificationOtp) {
        await User.updateOne({email}, {isEmailVerified: true, emailVerificationOtp: null}, {new: true});
        let updatedUser = await User.findOne({email});
        updatedUser = {...updatedUser}._doc;
        createSendToken(updatedUser, 201, res);
        sendEmail({
            email: user.email, subject: "Welcome to DucklingFit.com!", html: getHtmlForWelcome(user.name)
        });
        return;
    }

    res.status(401).json({
        status: "fail", message: "OTP mismatch"
    });
})

exports.login = catchAsync(async (req, res, next) => {
    let {loginField, password} = req.body;

    //check if email and password exists => user entered these fields
    if (!loginField || !password) {
        return next(new AppError("Please provide phone number/email and password", 400));
    }

    //check if user exists and password is correct
    //we have restricted the default selection of password, so we explicitly select password
    const filter = loginField.includes("@") ? {email: loginField.trim().toLowerCase()} : {phone: loginField};
    let user = await User.findOne(filter).select('+password');
    if (!user?.isEmailVerified) return next(new AppError("No such user!", 400));

    if (!user || !(await user.correctPassword(password, user.password))) return next(new AppError("Incorrect phone number/email or password!", 401));

    user = {...user}._doc;

    createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
    const options = process.env.NODE_ENV === "development" ? {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), httpOnly: true, secure: false,
    } : {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), secure: true, domain: ".ducklingfit.com"
    };
    res.cookie("jwt", "", options).json({
        status: "success", message: "cookie deleted"
    })

});

//makes sure that user is logged in == has a valid bearer token
//if all is good, that user is added to the req
exports.protect = catchAsync(async (req, res, next) => {
    let token = req.cookies.jwt;

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

    //grant access to the protected rout
    //also add this user to the request object
    req.user = freshUser;
    next();
});

exports.isLoggedIn = catchAsync(async (req, res, next,) => {
    let token = req.cookies.jwt;

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



//to send an email to user when he forget the password
exports.forgotPassword = catchAsync(async (req, res, next) => {

    let {credential} = req.body;

    //check if email and password exists => user entered these fields
    if (!credential) {
        return next(new AppError("Please provide phone number or email", 400));
    }

    //check if user exists and password is correct
    //we have restricted the default selection of password, so we explicitly select password
    const filter = credential.includes("@") ? {email: credential.trim().toLowerCase()} : {phone: credential};

    //get user based on posted email or phone number
    const user = await User.findOne(filter);

    //link is the link of client page
    if (!user) {
        return next(new AppError("No user with these credentials.", 404));
    }

    //generate token
    const resetToken = user.createPasswordResetToken();

    //validation is set false because few fields such as password and confirm password is not provided by the user
    //so save without validation
    await user.save({validateBeforeSave: false});

    //send it to user's email
    const resetUrl = `${(process.env.NODE_ENV === "development" ? "http://localhost:5173" : "www.ducklingfit.com")}/forgotPassword/${resetToken}`;
    const html = getPasswordResetHtml(user.name, resetUrl);

    if (isInDev()) {
        console.log("in db: " + user.passwordResetToken);
        console.log(resetUrl);
    }

    try {
        if (isInProd()) await sendPasswordResetEmail({
            email: user.email, subject: "Reset password token. Valid for 10 min only!", html
        });

        res.status(200).json({
            status: 'success', message: 'Link to change password sent to your email!'
        })
    } catch (err) {
        //if failed to send the email, set these fields to undefined
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});
        return next(new AppError('There was an error sending you email! Please try again later!', 500));
    }
});

//to reset the password using password reset link
exports.resetPassword = catchAsync(async (req, res, next) => {

    //1. get user based on token
    //we stored hashed resetToken in database, so hash the resetToken that user gave to compare
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");


    //get user based on the resetToken and also make sure that token is not expired yet
    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()}});

    if (isInDev()) console.log(req.params.token, hashedToken);

    //2. if token is not expired and there is a user then set new password
    if (!user) return next(new AppError('Token is invalid or has expired. Please request a new one!', 400));
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save(); //pre save functions will check if password and confirm password matches

    //3. updated password changed property of user
    //done in pre('save'.... middleware in userModel

    //4. log the user in, send jwt
    createSendToken(user, 200, res);
});


//user can change his password using current password
exports.updateMyPassword = catchAsync(async (req, res, next) => {
    //1. get user from the collection
    //this is only accessible after user login => req has user object

    if (!req.body.password) return next(new AppError("Please provide current password!", 400));

    const user = await User.findById(req.user._id).select('+password');

    //2. check if posted password is correct
    if (!user || !(await user.correctPassword(req.body.password, user.password))) {
        return next(new AppError("Incorrect Password!", 401));
    }

    //3. update password
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save(); //pre-save functions in userModel will check if password and confirm password matches

    //4. log in using new password
    createSendToken(user, 200, res);
});
