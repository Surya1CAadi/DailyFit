const mongoose = require("mongoose");

//todo: add location to gym

const gymSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    }, city: {
        type: String, required: true
    }, address: {
        type: String, required: true
    }, addressLink: {
        type: String, required: true
    }, images: [{
        type: String
    }], slang: {
        type: String, required: true
    }, info: {
        type: String, required: true
    }, specifications: [{
        title: String, content: String
    }], openDays: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Slot',
        default: [],
        select: false
    }, sex: {
        type: String,
        enum: ["U", "M", "F"],
        required: true
    }, bookingsPerWeek: {
        type: [{
            weeklyBooking: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'WeeklyBookings'
            }, weekNumber: Number
        }], default: [], select: false
    }
}, {toJSON: {virtuals: true}, toObject: {virtuals: true}});


const Gym = mongoose.model("Gym", gymSchema);
module.exports = Gym;