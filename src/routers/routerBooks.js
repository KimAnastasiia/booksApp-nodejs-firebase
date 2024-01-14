const express = require('express');
const routerBooks = express.Router();
const {getAllBooks,getBookById } = require('../controllers/controllerBooks')

routerBooks.get("/",getAllBooks )
routerBooks.get("/:id",getBookById )
module.exports = routerBooks