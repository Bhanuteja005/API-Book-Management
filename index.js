require("dotenv").config();

const express = require('express');
const mongodb = require('mongoose');
var sexParse=require("body-parser");//it allows express to read body and then pass it or convert into JSON format
//database
const database = require("./database/database");

//models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//initialise express
const sexy = express();

console.log(process.env.MONGO_URL);
mongodb.connect(process.env.MONGO_URL,{
    useNewUrlParser : true ,
     useUnifiedTopology : true,
    }).then(()=>console.log("connection established"));



 sexy.use(sexParse.urlencoded({extended:true}));     sexy.use(sexParse.json());
/*
Route           /books                   GET: retrieve all books in the library.
Description     to get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/ sexy.get("/", async(req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
} );
/*
Route           /is
Description     to get specific book based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/ sexy.get("/is/:isbn", async(req, res) => {

    const getspecifiedbook=await BookModel.findOne({ISBN: req.params.isbn});
    //null !0=1,!1=0
    if(!getspecifiedbook){
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getspecifiedbook});
});
/*
Route           /c
Description     to get specific book based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/ sexy.get("/c/:category",async(req,res)=>{
   const getbookbasedoncategory=await BookModel.findOne({category: req.params.category});
    if(!getbookbasedoncategory){
        return res.json({error: `No book found for the category of ${req.params.category}`});
    }
    return res.json({book: getbookbasedoncategory});
} );
/*
Route           /l
Description     to get specific book based on language
Access          PUBLIC
Parameter       language
Methods         GET
*/ sexy.get("/l/:language",async(req,res)=>{
    const getbookbasedonlanguage=await BookModel.findOne({language: req.params.language});
        if(!getbookbasedonlanguage){
        return res.json({error: `No book found for the language of ${req.params.language}`});
    }
    return res.json({book: getbookbasedonlanguage});
} );
/*
Route           /author
Description     to get all the authors
Access          PUBLIC
Parameter       none
Methods         GET
*/ sexy.get("/author", async(req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
} );
/*
Route           /author/book
Description     to get all the authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/ sexy.get("/author/book/:isbn", async(req, res) => {
    const getauthorbasedonbook=await AuthorModel.find({books: req.params.isbn});
    if(!getauthorbasedonbook){
        return res.json({error: `No author found for the book of ${req.params.isbn}`});
    }
    return res.json({author: getauthorbasedonbook});
});
/*
Route           /author/id
Description     to get all the authors based on ids
Access          PUBLIC
Parameter       id
Methods         GET
*/ sexy.get("/author/id/:id", async(req, res) => {
    const getauthorbasedonid=await AuthorModel.findOne({id: req.params.id});
    if(!getauthorbasedonid){
        return res.json({error: `No author found for the id of ${req.params.id}`});
    }
    return res.json(getauthorbasedonid);
});
/*
Route           /publication
Description     to get all the publication 
Access          PUBLIC
Parameter       NONE
Methods         GET
*/ sexy.get("/publication", async(req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
} );
/*
Route           /publication/name
Description     to get all the publication based on name
Access          PUBLIC
Parameter       name
Methods         GET
*/ sexy.get("/publication/:name", async(req, res) => {
   const getpublicationbasedonname=await PublicationModel.findOne({name: req.params.name});
   if (!getpublicationbasedonname) {
      return res.status(404).json({error: `No publication found for the name of ${req.params.name}`}); 
   }    
   return res.json(getpublicationbasedonname);
});
/*
Route           /publication/book
Description     to get all the publication based on book
Access          PUBLIC
Parameter       book
Methods         GET
*/ sexy.get("/publication/book/:isbn", async(req, res) => {
    const getpublicationbasedonbook=await PublicationModel.findOne({books: req.params.isbn});
    if (!getpublicationbasedonbook) {
      return res.status(404).json({error: `No publication found for the book of ${req.params.isbn}`}); 
    }
        return res.json(getpublicationbasedonbook);
})

//post
/*
Route           /book/new
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/ sexy.post("/book/new", async(req, res) => {
    const {newBook} = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({books: addNewBook, message: "Book was added!"});
});
/*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/ 
sexy.post("/author/new", async(req, res) => {
    const {newAuthor} = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({authors: addNewAuthor, message: "Author was added!"});
});
    

/*
Route           /publication/new
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
sexy.post("/publication/new", async(req, res) => {
    const {newPublication} = req.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json({publications: addNewPublication, message: "Publication was added!"});
});

//put
/*
Route           /publication/update/book
Description     Update an publication
Access          public
Parameter       isbn
Methods         PUT
*/
sexy.put("/publication/update/book/:isbn", (req, res) => {
    // Update the publication database
    database.publications.forEach((pub) => {
       if(pub.id === req.body.pubId) {
          return pub.books.push(req.params.isbn);
       }
    });
    // Update the book database
    database.books.forEach((book) => {
       if(book.ISBN === req.params.isbn) {
          book.publication = req.body.pubId;
          return;
       }
    });
    return res.json({
       books: database.books,
       publications: database.publications,
       message: "Successfully updated publication",
    });
});

//delete
/*
Route           /book/delete
Description     delete author from book
Access          public
Method          DELETE
Parameter       index
*/
sexy.delete("/book/delete/:isbn", (req, res) => {
    //whichever book doesnot match with isbn, just send it to updatedBookDatabase array and return it back to front end
    //and rest will be filtered out
    const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);
    database.books = updatedBookDatabase;
    return res.json({books: database.books});
});
/*
Route           /author from book
Description     delete author from book
Access          public
Method          DELETE
Parameter       index
*/

sexy.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    // Update the book database
database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn) {
       const newAuthorList = (book.authors || []).filter((id) => id !== parseInt(req.params.authorId));
       book.authors = newAuthorList;
       return;
    }
 });
 
 // Update the author database
 database.authors.forEach((author) => {
    if(author.id === parseInt(req.params.authorId)) {
       const newBookList = (author.books || []).filter((book) => book !== req.params.isbn);
       author.books = newBookList;
       return;
    }
 });
    return res.json({
       book: database.books,
       authors: database.authors,
         message: "Author was deleted from the book",
});
}
);

 sexy.listen(3000, () => {
    console.log("Hey server is running");
});