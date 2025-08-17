const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const ownerSchema = new mongoose.Schema({
    phone: {
        type: String, required: [true, "Phone number is must"], unique: true
    }, email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Email is must!"],
        validate: [validator.isEmail, "Please provide a valid email!"],
    }, name: {
        type: String,
        required: [true, "A user must have a name"],
        minLength: [5, "name too short(min=5)!"],
        maxLength: [25, "name too long(max=25)!"],
    }, password: {
        type: String, required: [true, "Please create a password!"], minlength: 8, select: false, //do not select this ever
    }, passwordConfirm: {
        type: String, required: [true, "Please confirm the password!"], validate: {
            // This work on SAVE!!
            validator: function (el) {
                return el === this.password;
            }, message: "Passwords are not the same!",
        },
    }, passwordChangedAt: {
        type: Date,
    }, passwordResetToken: String, passwordResetExpires: Number, gym: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Gym', required: true
    }
});


//before saving, encrypt the password and remove confirm password
ownerSchema.pre("save", async function (next) {
    // no need to do this every time, do only when password in modified
    if (!this.isModified("password")) return next();
    //encrypt the password
    this.password = await bcryptjs.hash(this.password, 12);
    this.passwordConfirm = undefined; //don't save this in the database
    next();
});

//method to check the password
ownerSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcryptjs.compare(candidatePassword, userPassword);
};

//returns true if token was created BEFORE change in password
ownerSchema.methods.changePasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(`${this.passwordChangedAt.getTime() / 1000}`, 10);
        return JWTTimeStamp < changedTimestamp;
    }
    return false;
};

//modify passwordChangedAt when password is changed
ownerSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    //sometimes saving to database is slow
    // , so ... decreasing 10 second so it not to create any problem while loging in using token
    this.passwordChangedAt = Date.now() - 10000;
    next();
});

//hide inactive owner: these owner are deleted
ownerSchema.pre(/^find/, function (next) {
    //this points to current query
    this.find({active: {$ne: false}});
    next();
});

//creates a reset password token to
ownerSchema.methods.createPasswordResetToken = function () {
    //we cant simply store resetToken as it is into the database due to security issues
    const resetToken = crypto.randomBytes(32).toString("hex");

    //we will store the hashed token instead
    //we will send this original resetToken to user on email
    //when user will give us this token, we will hash this token and compare it with the one stored in the database

    //the next line will update the resetToken
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //valid for 10 minutes

    //we have not 'saved' this owner document yet, that will be done in the resetPassword function
    //that is supposed to call createPasswordResetToken
    return resetToken;
};



const Owner = mongoose.model('Owner',ownerSchema);
module.exports = Owner;