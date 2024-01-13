const express = require('express');
const routerBooks = express.Router();
const {getAllBooks } = require('../controllers/controllerBooks')

routerBooks.get("/",getAllBooks )

module.exports = routerBooks