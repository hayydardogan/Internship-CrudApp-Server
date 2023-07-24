const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    studentNo: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('studentInfo', dataSchema)