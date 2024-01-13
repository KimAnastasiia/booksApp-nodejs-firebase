const InputError = require('../errors/inputError')
const LogicError = require('../errors/logicError')
const {getAllBooks} = require("../repositories/repositoryBooks")

serviceBooks = {
    getAllBooks: async () => {
        let errors = []
        let books=await getAllBooks()
        
        if (books == null)
            errors.push(new LogicError("not possible get all books"));

        if (errors.length > 0)
            throw errors

        return books
    }
}
module.exports =serviceBooks