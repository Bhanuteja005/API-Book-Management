const mongoose = require("mongoose");

//create publication schema
const publicationSchema = mongoose.Schema(
    {
        id: Number,
        name: String,
        books: [String]
    }
);

//create book model
const PublicationModel = mongoose.model("Publications", publicationSchema);

module.exports = PublicationModel;