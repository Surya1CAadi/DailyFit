const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true
    }, timings: [
        {
            start: Number,
            limit: Number,
            rate: Number
        }
    ]
});


const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;