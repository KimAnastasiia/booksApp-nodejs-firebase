const routerBooks = require("./routerBooks");

let initRouters = (app) =>{

    app.use("/books",routerBooks)

}

module.exports = initRouters;