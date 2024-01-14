const InputError = require('../errors/inputError')
const LogicError = require('../errors/logicError')
const { getAllBooks, getBookById, insertBook } = require("../repositories/repositoryBooks")

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
    insertBook: async ( author,title) => {
        let errors = []

        if (author == undefined)
            errors.push(new InputError("author", 'author is undefined'));
        if (title == undefined)
            errors.push(new InputError("title", 'title is undefined'));

        if (errors.length > 0)
            throw errors

        let newBookId = await insertBook(author,title)
        
        if (newBookId == null)
            errors.push(new LogicError("not possible insert book"));

        if (errors.length > 0)
            throw errors

        return newBookId
    }
}
module.exports = serviceBooks