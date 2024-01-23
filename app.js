const express = require("express")
const port = 4000;
const app = express();
const initMiddlewares = require("./src/middlewares/middleware")
const initRouters = require("./src/routers/routers");
const cors = require('cors')
app.use(express.static('public'));
app.use(cors())
var fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(express.json())
initMiddlewares(app)
initRouters(app);
app.listen(port, () => {
    console.log("FinalApp listening on port "+port)
})

module.exports = app;