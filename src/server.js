import express from "express";
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRouters from './router/web';
import connectDB from './config/connectDB';
import cors from 'cors'

require('dotenv').config();

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

viewEngine(app);
initWebRouters(app);
connectDB();


let port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Nodejs is running on the port :" + port);
})