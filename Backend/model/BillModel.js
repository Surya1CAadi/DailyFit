const mongoose = require("mongoose");

const billModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }, orderId: String, gymId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Gym'
    }, dateId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Slot'
    }, timeId: String, status: {
        type: String, enum: ["Paid", "Pending", "Suspect"],
        default: "Pending"
    }, duckId: {
        type: String, select: false
    }
});


const Bill = mongoose.model('Bill', billModel);
module.exports = Bill;