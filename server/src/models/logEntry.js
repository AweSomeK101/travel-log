const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
    type: String,
    required: true,
}
const reqNumber = {
    type: Number,
    required: true,
}

const logEntrySchema = new Schema({
    title: reqString,
    description: String,
    comments: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    image: String,
    lat: {...reqNumber, min: -90, max: 90},
    long: {...reqNumber, min: -180, max: 180},
    visitDate: {
        required: true,
        type: Date
    }
}, {timestamps: true})

const LogEntry = mongoose.model("LogEntry", logEntrySchema)

module.exports = LogEntry;