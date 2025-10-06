const { connectDB, mongoose } = require("./plp_bookstore");
const { book } = require("./models/books");

async function main(){
    await connectDB();
    //CREATE
    await book.create({
            title: 'Wuthering Heights',
            author: 'Emily Brontë',
            genre: 'Gothic Fiction',
            published_year: 1847,
            price: 9.99,
            in_stock: true,
            pages: 342,
            publisher: 'Thomas Cautley Newby'
    })
    console.log('book created')

    READ
    const books = await book.find().select('genre');
     const author = await book.find().select('author');
    console.log('all books:',books,author);

    await book.updateOne({title:'1984'},{price:8.99});
    console.log('book updated');

    await book.deleteOne({title:'Wuthering Heights'});
    console.log('book deleted');

    // Filtering books
   const latestBooks = await book.find({
        in_stock:true,
        published_year:{$gt:2010}
    },
    {title:1,
        author:1,
        price:1,
        _id:0
    });
    console.log('found:',latestBooks);
     
        //  sorting books by price
     const ascendingOrder = await book.find().sort({price:1});
        console.log('ascending order:',ascendingOrder);

            const descendingOrder = await book.find().sort({price:-1});
        console.log('descending order:',descendingOrder);

        // Pagination
        const booksPerPage = 5;
        const currentPage = 1;
        const paginatedBooks = await book.find()
        .skip((currentPage - 1) * booksPerPage)
        .limit(booksPerPage);
        console.log(`Books on page ${currentPage}:`, paginatedBooks);

        // aggregation
        const avgPrice = await book.aggregate([
            {$group:{
                _id:'$genre',
                averagePrice:{$avg:'$price'}}},
        ])
        console.log('books by genre:',avgPrice);

        const authorWithMostBooks = await book.aggregate([
            {$group:{
                _id:'$author',
                bookCount:{$sum:1}}},
                {$sort:{bookCount:-1}},
                {$limit:1}
        ])
        console.log('author with most books:',authorWithMostBooks);

        const booksPublishedPerDecade = await book.aggregate([
            {$project:{
                decade:{$multiply:[{$floor:{$divide:['$published_year',10]}},10]},

            }},
            {$group:{
                _id:'$decade',
                bookCount:{$sum:1}
            }},
            {$sort:{_id:1}}
        ]);
        console.log('books published per decade:',booksPublishedPerDecade);

        //indexing
        await book.createIndexes({title:1});
        console.log('title index created');
        
}
main();