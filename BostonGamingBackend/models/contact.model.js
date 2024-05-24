const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Contact: Name er påkrævet!'],
    },
    email: {
        type: String,
        required: [true, 'Contact: Email er påkrævet!'],
    },
    phonenumber: {
        type: String,
        required: [true, 'Contact: Telefon-/mobilnummer er påkrævet!'],
    },
    message: {
        type: String,
        required: [true, 'Contact: Besked er påkrævet! Ellers giver det da for hulen ingen mening at skrive til os!!!'],
    },
    read: {
        type: Boolean,
        default: false
    },
    received: {
        type: Date,
        required: true,
        default: Date.now
    }

})


module.exports = mongoose.model('Contact', contactSchema, 'contact')