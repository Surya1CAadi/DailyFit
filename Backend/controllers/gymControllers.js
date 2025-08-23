const catchAsync = require("../util/catchAsync");
const Gym = require("../model/GymModel");
const Slot = require("../model/SlotModel");
const AppError = require("../util/appError");
const Booking = require("../model/BookingModel");
const Bill = require("../model/BillModel");
const WeeklyBookings = require("../model/WeeklyBookings");
const {
    weekDays, getIndianLocaleDate, getWeekNumber, formatTo_yyyy_mm_dd, getDayOfWeek
} = require("../util/dateFunctions");
const {isInDev} = require("../util/usefulFunctions");
const User = require("../model/UserModel");


exports.addGym = catchAsync(async (req, res, next) => {
    //todo: let only admin add the accounts

    const {name, city, address, images, slang, specifications, openDays, info, sex, addressLink} = req.body;

    const gym = await Gym.create({
        name, city, address, images, slang, info, sex, specifications, addressLink
    });

    const slots = [];
    for (const slt of openDays) {
        for (const day of slt.day) {
            const slot = await Slot.create({
                day: day, timings: slt.timings
            });
            slots.push(slot._id);
        }
    }

    gym.openDays = slots;
    await gym.save();

    res.status(200).json({
        status: "success", message: "Gym created successfully", data: {
            gym
        }
    });
});


exports.findGyms = catchAsync(async (req, res, next) => {
    //todo: check if we have that city and return appropriate error then

    const city = req.body.city;
    if (!city) {
        return res.status(400).json({
            status: "failed", message: "City not provided!"
        })
    }
    let gyms = await Gym.find({city}).select("name address images slang openDays sex").populate("openDays") || [];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = weekdays[new Date().getDay()];
    const start = new Date().getHours();

    gyms = gyms.map((gym) => {
        for (const slot of gym.openDays) {
            if (slot.day === today) return {
                ...gym._doc,
                rate: slot.timings.find(obj => obj.start >= start)?.rate || slot.timings[0]?.rate,
                openDays: gym.openDays.map(slot => slot.day),
                displayImage: gym.images[0],
                images: undefined
            }
        }
        return {
            ...gym._doc,
            rate: gym.openDays[0].timings[0]?.rate,
            openDays: gym.openDays.map(slot => slot.day),
            displayImage: gym.images[0],
            images: undefined
        }
    });

    res.status(200).json({
        status: "success", data: {
            gyms
        }
    })

});


exports.getGymInfo = catchAsync(async (req, res, next) => {
    const id = req.body.id;
    if (!id) return res.status(400).json({
        status: "failed", message: "Gym id not provided!"
    });

    let gym = await Gym.findById(id).select("name address images info specifications sex openDays addressLink").populate("openDays");
    if (!gym) return res.status(400).json({
        status: "failed", message: "We could not find this gym, please look for another one!"
    });

    gym = {...gym._doc};

    //get next 7 days data
    // const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // const today = new Date(); //UTC
    // const slots = [];
    // for (const i of [0, 1, 2, 3, 4, 5, 6]) {
    //     const lookingFor = new Date(today.getTime() + i * 24 * 60 * 60 * 1000)
    //     const lookingDay = weekdays[lookingFor.getDay()];
    //     const timeHour = lookingFor.toLocaleString("en-US", {
    //         timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false
    //     });
    //     const slot = gym.openDays.find((obj) => obj.day === lookingDay);
    //     if (!slot) continue;
    //     const toAdd = {
    //         date: lookingFor,
    //         slotId: slot._id,
    //         timings: i === 0 ? slot.timings.filter((obj) => obj.start > timeHour) : slot.timings
    //     }
    //     slots.push(toAdd);
    // }

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayUTC = new Date(); // UTC time
    const todayIST = new Date(todayUTC.toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })); // Convert to IST
    const slots = [];

    for (let i = 0; i < 7; i++) {
        const lookingFor = new Date(todayIST.getTime() + i * 24 * 60 * 60 * 1000);
        const lookingDay = weekdays[lookingFor.getDay()];
        const currentHourIST = lookingFor.getHours();

        const slot = gym.openDays.find((obj) => obj.day === lookingDay);
        if (!slot) continue;

        const timings = i === 0 ? slot.timings.filter((obj) => obj.start > currentHourIST) : slot.timings;
        if (timings.length === 0) continue; // Skip if no valid timings

        slots.push({
            date: lookingFor,
            slotId: slot._id,
            timings: timings
        });
    }


    gym.openDays = slots;

    res.status(200).json({
        status: "Success", data: {gym}
    });

});

exports.checkin = catchAsync(async (req, res, next) => {
    if (!req.body.bookingId) return next(new AppError("Booking id not provided!", 400));
    if (!req.body.duckId) return next(new AppError("Duck id not provided!", 400));

    const gym = await Gym.findById(req.owner.gym).select("+bookingsPerWeek");

    const date = getIndianLocaleDate();
    const ymd = formatTo_yyyy_mm_dd(date);
    const weekToSearch = getWeekNumber(ymd);

    //get booking week belonging to today
    const bookingWeeks = gym.bookingsPerWeek;
    let reqWeek;

    //it's better to check from end
    for (let i = bookingWeeks.length - 1; i >= 0; i--) {
        const wBObj = bookingWeeks[i];
        if (wBObj.weekNumber === weekToSearch) {
            reqWeek = await WeeklyBookings.findById(wBObj.weeklyBooking).exec();
            break;
        } else if (wBObj.weekNumber < weekToSearch) break;
    }

    const weekDay = reqWeek && reqWeek[`${getDayOfWeek(ymd)}`] || [];

    let booking;
    for (const obj of weekDay) {
        const bookings = obj.bookings;
        for (const bkng of bookings) {
            if (bkng.toString() === req.body.bookingId) {
                booking = await Booking.findById(bkng);
                break;
            }
        }
    }

    if (!booking) return next(new AppError("No such Booking found for this Gym!", 400));
    if (booking.checkinStatus && booking.checkinStatus !== "booked") return next(new AppError("This booking has already been fulfilled!", 403));

    const bill = await Bill.findById(booking.bill).select("+duckId");
    if (isInDev()) console.log(bill.duckId);

    if (bill.duckId !== req.body.duckId) return next(new AppError("Duck id mismatch!", 400));

    //add to user credit
    const user = await User.findById(bill.userId);
    const currentCredit = user.credits?.find((obj) => obj.status === 'current');
    if (!currentCredit){
        user.credits.push({
            credit: booking.credit || 0, status: "current"
        })
    } else
        currentCredit.credit += booking.credit || 0;
    await user.save({validateBeforeSave: false});

    booking.checkinStatus = "checked in";
    await booking.save();

    res.status(200).json({
        status: "Success", message: "user checked in!"
    });

});

//get a list of bookings of given date
exports.getBookings = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const gym = await Gym.findById(req.owner.gym).select("+bookingsPerWeek");
    const date = req.body.date;
    const ymd = formatTo_yyyy_mm_dd(date);
    const weekToSearch = getWeekNumber(ymd);

    //get booking week belonging to today
    const bookingWeeks = gym.bookingsPerWeek;
    let weekBookingDoc;

    //it's better to check from end
    for (let i = bookingWeeks.length - 1; i >= 0; i--) {
        const wBObj = bookingWeeks[i];
        if (wBObj.weekNumber === weekToSearch) {
            weekBookingDoc = await WeeklyBookings.findById(wBObj.weeklyBooking).populate(`${getDayOfWeek(ymd)}.bookings`).exec();
            break;
        } else if (wBObj.weekNumber < weekToSearch) break;
    }

    const weekArray = weekBookingDoc && weekBookingDoc[`${getDayOfWeek(ymd)}`] || [];

    const bookingsToReturn = [];

    for (const obj of weekArray) {
        const bookings = obj.bookings;
        for (const bookingDoc of bookings) {
            bookingsToReturn.push({
                ...bookingDoc.info, id: bookingDoc.id, checkinStatus: bookingDoc.checkinStatus
            });
        }
    }

    res.status(200).json({
        status: 'Success', data: {
            bookings: bookingsToReturn
        }
    });

});

exports.getGymHomeStats = catchAsync(async (req, res, next) => {
    const gym = await Gym.findById(req.owner.gym).select("+bookingsPerWeek");
    const date = getIndianLocaleDate();
    const ymd = formatTo_yyyy_mm_dd(date);
    const weekToSearch = getWeekNumber(ymd);

    //get booking week belonging to today
    const bookingWeeks = gym.bookingsPerWeek;
    let weekBookingDoc;

    //it's better to check from end
    for (let i = bookingWeeks.length - 1; i >= 0; i--) {
        const wBObj = bookingWeeks[i];
        if (wBObj.weekNumber === weekToSearch) {
            weekBookingDoc = await WeeklyBookings.findById(wBObj.weeklyBooking).populate(`${getDayOfWeek(ymd)}.bookings`).exec();
            break;
        } else if (wBObj.weekNumber < weekToSearch) break;
    }

    const weekArray = weekBookingDoc && weekBookingDoc[`${getDayOfWeek(ymd)}`] || [];

    let todaysRevenue = 0;
    let checkedIn = 0;
    let total = 0;

    for (const obj of weekArray) {
        const bookings = obj.bookings;
        for (const bookingDoc of bookings) {
            if (bookingDoc.checkinStatus === 'checked in') {
                todaysRevenue += bookingDoc.info.rate;
                checkedIn++;
            }
            if (bookingDoc.checkinStatus === 'booked') total++;
        }
    }
    total += checkedIn;

    res.status(200).json({
        status: "Success", data: {
            name: gym.name, todaysRevenue, checkedIn, total
        }
    });

});

















