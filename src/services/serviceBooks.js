const { storage } = require('../../database')
const InputError = require('../errors/inputError')
const LogicError = require('../errors/logicError')
const { getAllBooks, getBookById, insertBook, editBook, deleteBook, getAllBooksOfUser } = require("../repositories/repositoryBooks")
const fs = require('fs').promises;;
const sharp = require("sharp");
serviceBooks = {
    getAllBooks: async () => {
        let errors = []
        let books = await getAllBooks()

        if (books == null)
            errors.push(new LogicError("not possible get all books"));

        if (errors.length > 0)
            throw errors

        return books
    },
    getAllBooksOfUser: async (userId) => {
        let errors = []
        if (userId == undefined)
            errors.push(new InputError("userId", 'userId is undefined'));

        if (errors.length > 0)
            throw errors
        
        let books = await getAllBooksOfUser(userId)

        if (books == null)
            errors.push(new LogicError("not possible get your books"));

        if (errors.length > 0)
            throw errors

        return books
    },
    getBookById: async (id) => {
        let errors = []

        if (id == undefined)
            errors.push(new InputError("id", 'id is undefined'));

        if (errors.length > 0)
            throw errors

        let book = await getBookById(id)

        if (book == null)
            errors.push(new LogicError("not possible get book by id"));

        if (errors.length > 0)
            throw errors

        return book
    },
    insertBook: async (author, title, userId) => {
        let errors = []

        if (author == undefined)
            errors.push(new InputError("author", 'author is undefined'));
        if (title == undefined)
            errors.push(new InputError("title", 'title is undefined'));
        if (userId == undefined)
            errors.push(new InputError("userId", 'userId is undefined'));
        if (errors.length > 0)
            throw errors

        let newBookId = await insertBook(author, title, userId)

        if (newBookId == null)
            errors.push(new LogicError("not possible insert book"));

        if (errors.length > 0)
            throw errors

        return newBookId
    },
    editBook: async (id, author, title, userId) => {
        let errors = []

        if (id == undefined)
            errors.push(new InputError("id", 'id is undefined'));
        if (author == undefined)
            errors.push(new InputError("author", 'author is undefined'));
        if (title == undefined)
            errors.push(new InputError("title", 'title is undefined'));
        if (userId == undefined)
            errors.push(new InputError("userId", 'userId is undefined'));
        if (errors.length > 0)
            throw errors

        let book = await getBookById(id)

        if (book == null){
            errors.push(new LogicError("not possible get book by id"));
        }else {

            if(book.userId!=userId)
                errors.push(new LogicError("user is not owner of the book"));
        }
        if (errors.length > 0)
            throw errors

        let updatedBook = await editBook(id, author, title)

        if (updatedBook == null)
            errors.push(new LogicError("not possible edit book"));

        if (errors.length > 0)
            throw errors

        return updatedBook
    },
    deleteBook: async (id, userId) => {

        let errors = []

        if (id == undefined)
            errors.push(new InputError("id", 'id is undefined'));

        if (userId == undefined)
            errors.push(new InputError("userId", 'userId is undefined'));

        if (errors.length > 0)
            throw errors

        let book = await getBookById(id)

        if (book == null){
            errors.push(new LogicError("not possible get book by id"));
        }else {
            if(book.userId!=userId)
                errors.push(new LogicError("user is not owner of the book"));
        }

        if (errors.length > 0)
            throw errors
        
        let answer = await deleteBook(id)

        if (answer == null)
            errors.push(new LogicError("not possible delete book"));

        if (errors.length > 0)
            throw errors

        return answer
    },
    postPhoto: async (file, bookId, userId) => {
        let errors = []

        if (file == null)
            errors.push(new InputError("file", 'file is undefined'));

        if (file.size == 0)
            errors.push(new InputError("file", 'file is undefined'));

        if (bookId == null)
            errors.push(new InputError("bookId", 'bookId is undefined'));

        if (errors.length > 0)
            throw errors

        let book = await getBookById(bookId)

        if (book == null || book.length==0){
            errors.push(new LogicError("not possible get book by id"));
        }else {
            if(book.userId!=userId)
                errors.push(new LogicError("user is not owner of the book"));
        }
        if (errors.length > 0)
            throw errors

        let answer = { finish: true }

        const filePath = `photos/${bookId}.png`;
        const bucket = storage.bucket();

        await sharp(file.data)
            .resize(300,350)
            .toFile("public/images/"+bookId+'.png')


        await bucket.upload(`public/images/${bookId}.png`, {
            destination: filePath
        });
        const filePathDelete = `public/images/${bookId}.png`;

        // Delete the file
        await fs.unlink(filePathDelete);

        return answer
    },
}
module.exports = serviceBooks