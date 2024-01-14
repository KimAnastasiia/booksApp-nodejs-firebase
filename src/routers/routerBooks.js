const express = require('express');
const routerBooks = express.Router();
const {getAllBooks,getBookById,postBook,putBook,deleteBook } = require('../controllers/controllerBooks')

routerBooks.get("/",getAllBooks )
routerBooks.get("/:id",getBookById )
routerBooks.post("/",postBook )
routerBooks.put("/:id",putBook )
routerBooks.delete("/:id",deleteBook )
module.exports = routerBooks