import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRouters = (app) => {

    router.get('/', (req, res) => {
        return res.send('rest api ndl ')
    })

    router.get('/api', homeController.getAboutPage)
    //api get user with login
    return app.use("/", router);
}

module.exports = initWebRouters;