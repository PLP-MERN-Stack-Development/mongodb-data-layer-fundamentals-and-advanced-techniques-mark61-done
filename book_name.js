const { connectDB, mongoose } = require("./plp_bookstore");
const { book } = require("./models/books");

async function main() {
  await connectDB();
  await book.deleteMany({});

    await book.createIndexes({title:1});
        console.log('title index created');

        await book.createIndexes({author:1,published_year:-1});
        console.log('compound index created');

        await book.find({author:'George Orwell'}).explain('executionStats');
        console.log('query explained');

  await book.insertMany([
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      published_year: 1960,
      price: 12.99,
      in_stock: true,
      pages: 336,
      publisher: "J. B. Lippincott & Co.",
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      published_year: 1949,
      price: 10.99,
      in_stock: true,
      pages: 328,
      publisher: "Secker & Warburg",
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      published_year: 1925,
      price: 9.99,
      in_stock: true,
      pages: 180,
      publisher: "Charles Scribner's Sons",
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      genre: "Dystopian",
      published_year: 2010,
      price: 11.5,
      in_stock: false,
      pages: 311,
      publisher: "Chatto & Windus",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      published_year: 1937,
      price: 14.99,
      in_stock: true,
      pages: 310,
      publisher: "George Allen & Unwin",
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Fiction",
      published_year: 1951,
      price: 8.99,
      in_stock: true,
      pages: 224,
      publisher: "Little, Brown and Company",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      published_year: 2010,
      price: 7.99,
      in_stock: true,
      pages: 432,
      publisher: "T. Egerton, Whitehall",
    },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      published_year: 2021,
      price: 19.99,
      in_stock: true,
      pages: 1178,
      publisher: "Allen & Unwin",
    },
    {
      title: "Animal Farm",
      author: "George Orwell",
      genre: "Political Satire",
      published_year: 1945,
      price: 8.5,
      in_stock: false,
      pages: 112,
      publisher: "Secker & Warburg",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Fiction",
      published_year: 2022,
      price: 10.99,
      in_stock: true,
      pages: 197,
      publisher: "HarperOne",
    },
  ]);
  console.log("Books inserted");
  await mongoose.disconnect();
}
main();
