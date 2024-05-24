const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Produktets titel er påkrævet!']
    },
    content: {
        type: String,
        required: [true, 'Produktets indhold/beskrivelse er påkrævet!']
    },
    productimage: {
        type: String,
        required: [true, 'Produktets billede er påkrævet!']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Produktets category/kategori er påkrævet!'],
    }
})


module.exports = mongoose.model('Product', productSchema, 'products')