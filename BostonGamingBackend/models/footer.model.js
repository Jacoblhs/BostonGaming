const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({

    about: {
        type: String,
        required: [true, 'Footer: about-tekst er påkrævet!'],
    },
    location: {
        type: String,
        required: [true, 'About: Location er påkrævet'],
    }
})


module.exports = mongoose.model('Footer', footerSchema, 'footer')