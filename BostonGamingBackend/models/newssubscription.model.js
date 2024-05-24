const mongoose = require('mongoose');


const newssubscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Newsletter: Email er påkrævet!'],
        index: { unique: true }
    },
    name: {
        type: String,
        required: [true, 'Newsletter: Name er påkrævet!'],
    }
})


module.exports = mongoose.model('Newssubscription', newssubscriptionSchema, 'newssubscription')