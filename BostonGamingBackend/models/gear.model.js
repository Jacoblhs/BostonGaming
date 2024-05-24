const mongoose = require('mongoose');


const gearSchema = new mongoose.Schema({

    geartitle: {
        type: String,
        required: [true, 'Gears titel (title) er påkrævet!']
    },
    price: {
        type: Number,
        required: [true, 'Gears pris er påkrævet!']
    },
    gearcategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'Gearcategory',
        required: [true, 'Gears category (kategori) er påkrævet!']
    }

})


module.exports = mongoose.model('Gear', gearSchema, 'gears')