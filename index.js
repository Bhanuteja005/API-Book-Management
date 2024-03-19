const express = require('express');

//database
const database = require("./database");

//initialise express
const booky = express();

/*
Route           /books                   GET: retrieve all books in the library.
Description     to get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/", (req, res) => {
    return res.json({books: database.books});
} );
/*
Route           /is
Description     to get specific book based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/is/:isbn", (req, res) => {
    const getspecifiedbook=database.books.filter( (books) => books.ISBN === req.params.isbn);
    if(getspecifiedbook.length === 0){
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
*/
booky.get("/c/:category",(req,res)=>{
    const getbookbasedoncategory=database.books.filter((books)=>books.category.includes(req.params.category));
    if(getbookbasedoncategory.length===0){
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
*/
booky.get("/l/:language",(req,res)=>{
    const getbookbasedonlanguage=database.books.filter((books)=>books.language.includes(req.params.language));
    if(getbookbasedonlanguage.length===0){
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
*/
booky.get("/author/:name", (req, res) => {
    return res.json({author: database.authors});
} );
/*
Route           /author/book
Description     to get all the authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/author/book/:isbn", (req, res) => {
    const getauthorbasedonbook=database.authors.filter((author)=>author.books.includes(req.params.isbn));
    if(getauthorbasedonbook.length===0){
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
*/
booky.get("/author/id/:id", (req, res) => {
    const getauthorbasedonid=database.authors.filter((author)=>author.id===req.params.id);
    if(getauthorbasedonid.length===0){
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
*/
booky.get("/publication", (req, res) => {
    return res.json({publication: database.publications});
} );
/*
Route           /publication/name
Description     to get all the publication based on name
Access          PUBLIC
Parameter       name
Methods         GET
*/
booky.get("/publication/:name", (req, res) => {
   let publication = database.publications.filter((publication) => publication.name === req.params.name);
   if (!publication.length) {
      return res.status(404).json({error: `No publication found for the name of ${req.params.name}`}); 
   }    
   return res.json(publication);
});
/*
Route           /publication/book
Description     to get all the publication based on book
Access          PUBLIC
Parameter       book
Methods         GET
*/
booky.get("/publication/book/:isbn", (req, res) => {
    let publication = database.publications.filter((publication) => publication.books.includes(req.params.isbn));
    if (!publication.length) {
      return res.status(404).json({error: `No publication found for the book of ${req.params.isbn}`}); 
    }
    let getpublicationbasedonbook=database.publications.filter((publication)=>publication.books.includes(req.params.isbn));
    return res.json(getpublicationbasedonbook);
})
booky.listen(3000, () => {
    console.log("Hey server is running");
});