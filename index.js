const express = require('express');

var sexParse=require("body-parser");//it allows express to read body and then pass it or convert into JSON format
//database
const database = require("./database");

//initialise express
const sexy = express();
 sexy.use(sexParse.urlencoded({extended:true}));     sexy.use(sexParse.json());
/*
Route           /books                   GET: retrieve all books in the library.
Description     to get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/ sexy.get("/", (req, res) => {
    return res.json({books: database.books});
} );
/*
Route           /is
Description     to get specific book based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/ sexy.get("/is/:isbn", (req, res) => {
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
*/ sexy.get("/c/:category",(req,res)=>{
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
*/ sexy.get("/l/:language",(req,res)=>{
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
*/ sexy.get("/author/:name", (req, res) => {
    return res.json({author: database.authors});
} );
/*
Route           /author/book
Description     to get all the authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/ sexy.get("/author/book/:isbn", (req, res) => {
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
*/ sexy.get("/author/id/:id", (req, res) => {
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
*/ sexy.get("/publication", (req, res) => {
    return res.json({publication: database.publications});
} );
/*
Route           /publication/name
Description     to get all the publication based on name
Access          PUBLIC
Parameter       name
Methods         GET
*/ sexy.get("/publication/:name", (req, res) => {
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
*/ sexy.get("/publication/book/:isbn", (req, res) => {
    let publication = database.publications.filter((publication) => publication.books.includes(req.params.isbn));
    if (!publication.length) {
      return res.status(404).json({error: `No publication found for the book of ${req.params.isbn}`}); 
    }
    let getpublicationbasedonbook=database.publications.filter((publication)=>publication.books.includes(req.params.isbn));
    return res.json(getpublicationbasedonbook);
})

//post
/*
Route           /book/new
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/ sexy.post("/book/new", (req, res) => {
    const newBook = req.body;
    // Check if the book already exists
    const existingBookIndex = database.books.findIndex((book) => book.ISBN === newBook.ISBN);

    if (existingBookIndex !== -1) {
        // If the book exists, update it
        database.books[existingBookIndex] = newBook;
    } else {
        // If the book doesn't exist, add it
        database.books.push(newBook);
    }
    return res.json({updatedBooks: database.books});
});
/*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/ 
sexy.post("/author/new", (req, res) => {
    const newAuthor = req.body;
    const existingAuthorIndex = database.authors.findIndex((author) => author.id === newAuthor.id);

    if (existingAuthorIndex !== -1) {
        // If the author exists, update it
        database.authors[existingAuthorIndex] = newAuthor;
    } else {
        // If the author doesn't exist, add it
        database.authors.push(newAuthor);
    }
    return res.json({updatedAuthors: database.authors});
});

/*
Route           /publication/new
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
sexy.post("/publication/new", (req, res) => {
    const newPublication = req.body;
    const existingPublicationIndex = database.publications.findIndex((publication) => publication.id === newPublication.id);

    if (existingPublicationIndex !== -1) {
        // If the publication exists, update it
        database.publications[existingPublicationIndex] = newPublication;
    } else {
        // If the publication doesn't exist, add it
        database.publications.push(newPublication);
    }
    return res.json({updatedPublications: database.publications});
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