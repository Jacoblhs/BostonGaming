const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({

    content1: {
        type: String,
        required: [true, 'About: Content 1 er påkrævet!'],
    },
    content2: {
        type: String,
        required: [true, 'About: Content 2 er påkrævet!'],
    }
})


module.exports = mongoose.model('About', aboutSchema, 'about')