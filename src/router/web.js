import express from "express";
import userRouter from "../module/user/userRouter";
import authRouter from "../module/auth/authRouter";
import doctorRouter from '../module/doctor/doctorRouter';
import departmentRouter from '../module/department/departmentRouter';
import bookingRouter from '../module/booking/bookingRouter';


let router = express.Router();

let initWebRouters = (app) => {

    router.get('/', (req, res) => {
        return res.send("Welcome to API with NDL")
    })

    //api user 
    app.use('/api/user', userRouter);
    app.use('/auth', authRouter);
    app.use('/api/doctor', doctorRouter);
    app.use('/api/department', departmentRouter);
    app.use('/api/booking', bookingRouter);

    //api get user with login
    return app.use("/", router);
}

module.exports = initWebRouters;