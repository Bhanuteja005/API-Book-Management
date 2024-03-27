const mongoose = require("mongoose");

//create book schema
const Bookschema = mongoose.Schema(
    {
        ISBN: String,
        title: String,
        pubDate: String,
        language: String,
        numPage: Number,
        author: [Number],
        publisher:[Number],
        price: String,
        description: String,
        categories: [String]
    }
);

//create book model
const BookModel = mongoose.model("books", Bookschema);

module.exports = BookModel;