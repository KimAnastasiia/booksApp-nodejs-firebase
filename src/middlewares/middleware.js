const authenticationMiddleware = require("./authenticationMiddleware");


let initMiddlewares = (app) =>{
    app.use(["/books"],authenticationMiddleware)
}

module.exports = initMiddlewares;
