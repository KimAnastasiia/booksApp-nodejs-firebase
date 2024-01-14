const express = require('express');
const routerBooks = express.Router();
const {getAllBooks,getBookById,postBook } = require('../controllers/controllerBooks')

routerBooks.get("/",getAllBooks )
routerBooks.get("/:id",getBookById )
routerBooks.post("/",postBook )
module.exports = routerBooks