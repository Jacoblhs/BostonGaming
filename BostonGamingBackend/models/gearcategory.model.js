const mongoose = require('mongoose');


const gearcategorySchema = new mongoose.Schema({

    gearcategorytitle: {
        type: String,
        required: [true, 'Gear-categorys titel (title) er påkrævet!'],
    }
})


module.exports = mongoose.model('Gearcategory', gearcategorySchema, 'gearcategories')