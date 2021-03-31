const mongoose = require('mongoose');
const schema = mongoose.Schema;

const exerciseSchema = new schema({
    username: { type: String, requierd: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, requierd: true }
}, { timestamps: true });

const Exercise = mongoose.model('Exercises', exerciseSchema);
module.exports = Exercise;