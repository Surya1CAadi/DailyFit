const mongoose = require("mongoose");

const booking = new mongoose.Schema({
    info: {
        gym: String,
        image: String,
        address: String,
        date: Date,
        rate: Number,
        time: Number,
        user: String,
    }
    , bill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill'
    }, checkinStatus: {
        type: String, enum: ["checked in", "canceled", "refunded", "booked"],
        default: "booked"
    }, credit: Number, refId: String
},{timestamps: true});


const Booking = mongoose.model('Booking', booking);
module.exports = Booking;