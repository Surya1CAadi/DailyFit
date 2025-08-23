const User = require("../model/UserModel");
const catchAsync = require("../util/catchAsync");
const axios = require("axios");
const AppError = require("../util/appError");
const Booking = require("../model/BookingModel");
const Bill = require("../model/BillModel");
const {getIndianLocaleDate} = require("../util/dateFunctions");


exports.deleteMe = catchAsync(async (req, res, next) => {
    //todo: this need to be changes, was copied from previous project
    //1. get user from the collection
    let user = await User.findById(req.user._id).select('+password');

    //2. check if posted password is correct
    if (!user || !req.body.password || !(await user.correctPassword(req.body.password, user.password))) {
        return next(new AppError("Incorrect password!", 401));
    }

    //delete the platformsFor that user
    for (const platform of user.codingPlatforms) {
        await CodingProfile.findOneAndDelete(platform);
    }

    //delete the user
    await User.findByIdAndDelete(req.user._id);


    //we won't see the response in postman as status code is 204
    res.status(204).json({
        status: 'success', message: "User deleted!", data: null
    });

});

//returns the subscriptions a user have
exports.getSubscriptions = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate("subscriptions");
    const subscriptionsToReturn = [];

    user.subscriptions.forEach((sub) => {
        subscriptionsToReturn.push({...sub.info, id: sub.id, checkinStatus: sub.checkinStatus})
    });

    const lastCredit = user.credits?.slice(-1)[0] || {};

    res.status(200).json({
        status: "Success", data: {
            subscriptions: subscriptionsToReturn, credit: lastCredit.status === 'current' ? lastCredit.credit : 0
        }
    });
});

//get a particular order deatials
exports.getOrderDetail = catchAsync(async (req, res, next) => {
    const user = req.user;
    const bookingId = req.body.bookingId;

    if (!bookingId) return next(new AppError("No bookingId given!", 400));

    let bookingDoc = undefined;

    for (const sub of user.subscriptions) if (sub.toString() === bookingId) {
        bookingDoc = await Booking.findById(bookingId).populate("bill", "duckId gymId");
        break;
    }

    if (!bookingDoc) return next(new AppError("No such booking found!", 400));

    if (bookingDoc.checkinStatus !== 'checked in') bookingDoc.credit = 0;

    res.status(200).json({
        status: "Success", data: {
            booking: bookingDoc
        }
    });
});


exports.cancelOrder = catchAsync(async (req, res, next) => {

    const user = req.user;
    const bookingId = req.body.bookingId;

    // console.log(bookingId);

    //now see if its before 1 hour
    let bookingDoc = undefined;

    for (const sub of user.subscriptions) {
        if (sub.toString() === bookingId) {
            bookingDoc = await Booking.findById(bookingId).exec();
            break;
        }
    }

    if (!bookingDoc) return next(new AppError("No such booking found!", 400));
    if (bookingDoc.checkinStatus !== "booked") return next(new AppError("This booking has already cancelled/ refunded or checked in!", 400));

    const today = getIndianLocaleDate();
    const bookingDate = getIndianLocaleDate(bookingDoc.info.date);
    if (today === bookingDate) {
        const options = {timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false};
        const hourNow = new Date().toLocaleString('en-US', options);
        if (hourNow < bookingDoc.info.time - 1) {
            bookingDoc.checkinStatus = "canceled";
            await bookingDoc.save();
            return res.status(200).json({
                status: "success", message: "Booking canceled! we will refund your money within 2 to 3 working days."
            });
        } else {
            return next(new AppError("Cancellation time has passed!", 400));
        }
    } else if (new Date() < bookingDoc.info.date) {
        bookingDoc.checkinStatus = "canceled";
        await bookingDoc.save();
        return res.status(200).json({
            status: "success", message: "Booking canceled! we will refund your money within 2 to 3 working days."
        });
    }

    return next(new AppError("Cancellation date has been passed!", 400));
});

exports.requestRedeem = catchAsync(async (req, res, next) => {

    const {upi, upic} = req.body;
    if (!upi || !upic || upi !== upic) return next(new AppError("UPI Id not provided or mismatches", 400));

    const user = await User.findById(req.user._id).select('+password').exec();

    if (!user || !(await user.correctPassword(req.body.password, user.password))) return next(new AppError("Incorrect Password!", 401));


    const creditObj = user.credits.find(obj => obj['status'] === 'current');
    if (!creditObj || creditObj.credit < 5) return next(new AppError("Insufficient credit.", 400));

    creditObj['status'] = 'pending';
    creditObj.upi = req.body.upi;
    creditObj.updatedAt = new Date();

    user.save({validateBeforeSave: false});

    res.status(200).json({
        status: 'success', message: 'request to redeem sent'
    });
});


exports.getPendingRedeems = catchAsync(async (req, res, next) => {
    const user = req.user;

    const pending = user.credits.filter((obj) => obj['status'] === 'pending');

    res.status(200).json({
        status: "success", data: {
            pendingReq: pending
        }
    })

});



exports.getPreviousRedeems = catchAsync(async (req, res, next) => {
    const user = req.user;

    const previous = user.credits.filter((obj) => obj['status'] === 'fulfilled');

    res.status(200).json({
        status: "success", data: {
            previousReq: previous
        }
    })

});





















