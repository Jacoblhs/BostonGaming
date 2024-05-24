const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Kategoriens titel er påkrævet!'],
    }
})


module.exports = mongoose.model('Category', categorySchema, 'categories')