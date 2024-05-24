const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({

    sliderimage: {
        type: String,
        required: [true, 'Sliderbillede er påkrævet!']
    },
    alttext: {
        type: String,
        required: [true, 'Sliderbilledets alt-text er påkrævet!']
    }
})


module.exports = mongoose.model('Slider', sliderSchema, 'slider')