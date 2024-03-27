const mongoose = require("mongoose");

//create publication schema
const authorSchema = mongoose.Schema(
    {
        id: Number,
        name: String,
        books: [String]
    }
);

//create book model
const AuthorModel = mongoose.model("books", authorSchema);

module.exports = AuthorModel;