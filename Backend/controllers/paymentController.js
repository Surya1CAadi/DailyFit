const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");
const User = require("../model/UserModel");
const Slot = require("../model/SlotModel");
const Gym = require("../model/GymModel");
const WeeklyBookings = require("../model/WeeklyBookings");
const {
    getWeekNumber, getIndianLocaleDate, getDayOfWeek, formatTo_yyyy_mm_dd
} = require("../util/dateFunctions");
const Bill = require("../model/BillModel");
const Razorpay = require("razorpay");
const Booking = require("../model/BookingModel");
const crypto = require("crypto");
const {generateDuckId, getCredit} = require("../util/usefulFunctions");
const {getCurrentNextDate} = require("../util/dateFunctions");

//todo: check for requesting 1+week date or date in past etc.
//todo: what if user has multiple payment windows open?
//todo: create some uniqueness in subscription
//todo: hash duckId as password is being hashed

//returns {gym, slot, timing, requestedDate} for the (gymId, dateId, timeId) passed to the function
async function getRequestedDateTime(gymId, dateId, timeId) {
    const gym = await Gym.findById(gymId).select("+openDays +bookingsPerWeek");
    if (!gym) return new AppError("Invalid gym!", 400);

    let slot = gym.openDays.find((id) => id.toString() === dateId.toString());
    if (!slot) return new AppError("Invalid Slot!", 400);

    slot = await Slot.findById(slot);
    if (!slot) return new AppError("Invalid Slot!", 400);

    const timing = slot.timings.find((obj) => obj._id.toString() === timeId);
    if (!timing) return new AppError("Invalid Timing", 400);

    const requestedDate = getCurrentNextDate(slot.day);
    requestedDate.setHours(timing.start, 0, 0, 0);

    return {gym, slot, timing, requestedDate};
}

exports.getOrderId = catchAsync(async (req, res, next) => {
    const user = req.user;

    //making sure that these three are valid
    const {gymId, dateId, timeId} = req.body;

    let obj;
    try {
        obj = await getRequestedDateTime(gymId, dateId, timeId);
    } catch (e) {
        return next(e);
    }
    const {gym, slot, timing, requestedDate} = {...obj};
    requestedDate.setHours(0, 0, 0, 0);

    //check if we have slot remaining
    const ymd = formatTo_yyyy_mm_dd(getIndianLocaleDate(requestedDate));
    const weekToSearch = getWeekNumber(ymd);

    //get booking week belonging to requestedDate
    const bookingWeeks = gym.bookingsPerWeek;
    let weekBookingDoc;

    //it's better to check from end
    for (let i = bookingWeeks.length - 1; i >= 0; i--) {
        const wBObj = bookingWeeks[i];
        if (wBObj.weekNumber === weekToSearch) {
            weekBookingDoc = await WeeklyBookings.findById(wBObj.weeklyBooking).exec();
            break;
        } else if (wBObj.weekNumber < weekToSearch) break;
    }

    //now look for that slot in weekBookingDoc
    const weekArray = weekBookingDoc && weekBookingDoc[`${getDayOfWeek(ymd)}`] || [];
    const timelyBookings = weekArray.find((obj) => obj.time === timing.start);
    if (timelyBookings && timelyBookings.bookings.length > timing.limit) return next(new AppError("All slots are full.", 400));

    //creating a razorpay order
    //creating a bill/receipt
    const bill = await Bill.create({
        userId: user.id, gymId, dateId: dateId, timeId: timeId
    });

    let instance = new Razorpay({key_id: process.env.RAZ_KEY, key_secret: process.env.RAZ_SECRET})

    let options = {
        amount: timing.rate * 100, currency: "INR", receipt: bill.id
    };

    const order = await instance.orders.create(options);
    bill.orderId = order.id;
    await bill.save();

    res.status(200).json({
        status: "success", data: {
            gym: {
                name: gym.name, city: gym.city, address: gym.address, displayImage: gym.images[0]
            }, requestedDate, rate: timing.rate, billId: bill.id, orderId: order.id, user: {
                id: user.id, name: user.name, email: user.email, contact: user.phone
            }
        }
    });
});

exports.validateSubscription = catchAsync(async (req, res, next) => {
    // console.log("body");
    // console.log(req.body);

    const {userId, billId, razSign, razPaymentId} = req.body;

    //check if that user and bill exists
    const user = await User.findById(userId);
    const bill = await Bill.findById(billId);
    if (!user || !bill) {
        bill.status = "Suspect";
        await bill.save();
        return next(new AppError("There is something wrong with this payment! Please contact us if u think this is a mistake!", 400));
    }


    //check if payment is verified
    const sha = crypto.createHmac("sha256", process.env.RAZ_SECRET);
    sha.update(`${bill.orderId}|${razPaymentId}`);
    const digest = sha.digest("hex");
    if (digest !== razSign) {
        bill.status = "Suspect";
        await bill.save();
        return next(new AppError("There is something wrong with this payment! Please contact us if u think this is a mistake!", 400));
    }

    //BUY!!
    let obj;
    try {
        obj = await getRequestedDateTime(bill.gymId, bill.dateId, bill.timeId);
    } catch (e) {
        bill.status = "Suspect";
        await bill.save();
        return next(e);
    }
    const {gym, slot, timing, requestedDate} = obj;
    bill.status = "Paid";
    //now adding duck id
    bill.duckId = generateDuckId(8);
    await bill.save();

    // create a credit
    const credit = getCredit(1, 5, timing.rate);

    const booking = await Booking.create({
        info: {
            gym: gym.name,
            image: gym.images[0],
            address: gym.address,
            date: requestedDate,
            rate: timing.rate,
            time: timing.start,
            user: user.name
        }, bill, credit
    });

    user.subscriptions.push(booking);
    await user.save({validateBeforeSave: false});


    //now add this booking to appropriate bookingsPerWeek of the gym
    const ymd = formatTo_yyyy_mm_dd(getIndianLocaleDate(requestedDate));
    const weekToSearch = getWeekNumber(ymd);

    //get booking week belonging to requestedDate
    const bookingWeeks = gym.bookingsPerWeek;
    let weekBookingDoc;

    //it's better to check from end
    for (let i = bookingWeeks.length - 1; i >= 0; i--) {
        const wBObj = bookingWeeks[i];
        if (wBObj.weekNumber === weekToSearch) {
            weekBookingDoc = await WeeklyBookings.findById(wBObj.weeklyBooking).exec();
            break;
        } else if (wBObj.weekNumber < weekToSearch) break;
    }

    //now there are two scnerios: there is weekBookingDoc and there is not
    //when ther is weekBookingDoc:
    if (weekBookingDoc) {
        const weekArray = weekBookingDoc[`${getDayOfWeek(ymd)}`] || [];
        const timeSlot = weekArray.find((obj) => obj.time === timing.start);
        if (timeSlot) timeSlot.bookings.push(booking);
        else {
            const timeSlot = {
                time: timing.start,
                bookings: [booking]
            }
            weekArray.push(timeSlot);
        }
        await weekBookingDoc.save();
    } else {
        const newWeeklyBooking = await WeeklyBookings.create({
            gym: gym,
        });
        newWeeklyBooking[slot.day] = [{
            time: timing.start,
            bookings: [booking]
        }];
        await newWeeklyBooking.save();
        gym.bookingsPerWeek.push({
            weeklyBooking: newWeeklyBooking,
            weekNumber: weekToSearch
        });
        await gym.save();
    }

    //things shall be ok now '>'
    res.status(200).json({
        status: "success", data: {
            duckId: bill.duckId,
            bookingId: booking.id,
        }
    })
});