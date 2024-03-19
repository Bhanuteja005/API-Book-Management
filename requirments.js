//requirements for our project

//we are book management company

//Books
//ISBN, title, pub date, language, num page, author[], category[]

//Authors
//id, name, books[]


//Publications
//id, name, books[]
// we have design and code an api over this

//1. Books
//we need an api to get all books
//we need an api to get specific books
//we need an api to get a list of books based on category
//we need an api to get a list of books based on languages

//2. Authors
//we need an api to get all authors
//we need an api to get specific authors
//we need an api to get a list of authors based on books they wrote

//3. Publications
//we need an api to get all publications
//we need an api to get specific publications
//we need an api to get a list of publications based on books

//POST /books - add new book
//{newBook: {book details}}
//POST /authors - add new author
//{newAuthor: {author details}}
//PUT /books/isbn : update book details
//{updateBook: {updated book details}}
//DELETE /books/isbn : delete a book
//GET /publication/:name - get a publication based on name
//GET /categories/:categoryName - get a list of books based on category
//GET /languages/:language - get a list of books based on language