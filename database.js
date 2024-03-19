const books = [
    {
        ISBN: "12345Book",
        title: "Tesla!!!",
        pubDate: "2024-03-19",
        language: "en",
        numPage: 250,
        author: ["Bhanu Tesla"],
        publisher: "Bhanu Publishers",
        price: "$9.99",
        description: `In this book, you will learn about the life of Bhanu Tesla, his inventions, and his contributions to the world.`,
        categories: ["Science"]
    },
]
const authors =[
    {
        id: 1,
        name: "Bhanu Teja",
        books: ["12345Book","secretbook"]
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"]
    }
];
const publications = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"]
    }
];
module.exports = {books, authors, publications};