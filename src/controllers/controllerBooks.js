const {getAllBooks } = require("../services/serviceBooks")
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
    }
}
module.exports = controllerBooks