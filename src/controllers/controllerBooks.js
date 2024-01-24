const {getAllBooks, getBookById, insertBook, editBook, deleteBook, postPhoto, getAllBooksOfUser} = require("../services/serviceBooks")
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
    getAllBooksOfUser: async (req, res) => {
        
        try {
            const userId = req.user.uid
            let books = await getAllBooksOfUser(userId)
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
            const userId = req.user.uid
            const { author,title } = req.body;
            let newBookId = await insertBook(author, title, userId)
            return res.json({id:newBookId})
        }
        catch (errors) {
            return res.status(errors[0].code).json({ error: errors })
        }
    },
    putBook: async (req, res) => {
        
        try {
            const userId = req.user.uid
            const id = req.params.id;
            const { author,title } = req.body;
            let updatedBook = await editBook(id,author,title, userId)
            return res.json(updatedBook)
        }
        catch (errors) {
            return res.status(errors[0].code).json({ error: errors })
        }
    },
    deleteBook: async (req, res) => {
        
        try {
            const userId = req.user.uid
            const id = req.params.id;
            let answer = await deleteBook(id, userId)
            return res.json(answer)
        }
        catch (errors) {
            return res.status(errors[0].code).json({ error: errors })
        }
    },
    postPhoto: async (req, res) => {
        try {
            const file = req.files.file;
            const id = req.params.id;

            if (!file) {
                return res.status(400).json({ error: 'No file provided' });
            }
            const filePath = await postPhoto(file, id);
        
            return res.json({ message: 'File uploaded successfully' });
          } catch (errors) {
            console.error(errors);
            return res.status(errors[0].code).json({ error: errors })
          }
	},
}
module.exports = controllerBooks