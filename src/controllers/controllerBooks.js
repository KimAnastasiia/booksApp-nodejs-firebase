const {getAllBooks, getBookById, insertBook} = require("../services/serviceBooks")
let express = require('express');
let controllerBooks = express.Router();

controllerBooks = {
    getAllBooks: async (req, res) => {
        
        try {
            let books = await getAllBooks()
            return res.json(books)
        }
        catch (errors) {
            return res.status(errors[0].code).json({ error: errors })
        }
    },
    getBookById: async (req, res) => {
        
        try {
            const id = req.params.id
            let book = await getBookById(id)
            return res.json(book)
        }
        catch (errors) {
            return res.status(errors[0].code).json({ error: errors })
        }
    },
    postBook: async (req, res) => {
        
        try {
            const { author,title } = req.body;
            let newBookId = await insertBook(author,title)
            return res.json({id:newBookId})
        }
        catch (errors) {
            return res.status(errors[0].code).json({ error: errors })
        }
    },
}
module.exports = controllerBooks