
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
        ISBN: String,
        title: String,
        pubDate: String,
        language: String,
        numPage: Number,
        author: [Number],
        publisher:[Number],
        price: String,
        categories: [String]

});

const BookModel = mongoose.model('Books', bookSchema);

module.exports = BookModel;