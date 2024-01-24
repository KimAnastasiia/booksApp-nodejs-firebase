const express = require('express');
const routerBooks = express.Router();
const {getAllBooks,getBookById,postBook,putBook,deleteBook,postPhoto,getAllBooksOfUser } = require('../controllers/controllerBooks')

routerBooks.get("/",getAllBooks )
routerBooks.get("/myBooks",getAllBooksOfUser )
routerBooks.get("/:id",getBookById )
routerBooks.post("/",postBook )
routerBooks.post("/photo/:id",postPhoto )
routerBooks.put("/:id",putBook )
routerBooks.delete("/:id",deleteBook )
module.exports = routerBooks