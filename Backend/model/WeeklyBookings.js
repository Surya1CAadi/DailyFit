const mongoose = require("mongoose");

const weeklyBookings = new mongoose.Schema({
    gym: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Gym', required: true
    }, Thursday: [{
        time: Number, bookings: {type: [mongoose.Schema.Types.ObjectId], ref: 'Booking'}
    }], Friday: [{
        time: Number, bookings: {type: [mongoose.Schema.Types.ObjectId], ref: 'Booking'}
    }], Saturday: [{
        time: Number, bookings: {type: [mongoose.Schema.Types.ObjectId], ref: 'Booking'}
    }], Sunday: [{
        time: Number, bookings: {type: [mongoose.Schema.Types.ObjectId], ref: 'Booking'}
    }], Monday: [{
        time: Number, bookings: {type: [mongoose.Schema.Types.ObjectId], ref: 'Booking'}
    }], Tuesday: [{
        time: Number, bookings: {type: [mongoose.Schema.Types.ObjectId], ref: 'Booking'}
    }], Wednesday: [{
        time: Number, bookings: {type: [mongoose.Schema.Types.ObjectId], ref: 'Booking'}
    }], totalSale: {
        type: Number, default: 0
    }
});

const WeeklyBookings = mongoose.model("WeeklyBookings", weeklyBookings);
module.exports = WeeklyBookings;