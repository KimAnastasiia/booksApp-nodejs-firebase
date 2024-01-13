const express = require("express")
const port = 4000;
const app = express();
const initRouters = require("./src/routers/routers");
const cors = require('cors')
app.use(express.static('public'));
app.use(cors())
app.use(express.json())

initRouters(app);
app.listen(port, () => {
    console.log("FinalApp listening on port "+port)
})

module.exports = app;