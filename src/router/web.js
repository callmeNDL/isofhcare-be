import express from "express";
import userRouter from "../module/user/userRouter";
import authRouter from "../module/auth/authRouter";
import doctorRouter from '../module/doctor/doctorRouter';
import departmentRouter from '../module/department/departmentRouter';
import bookingRouter from '../module/booking/bookingRouter';
import roleRouter from '../module/role/roleRouter'
import medicineRouter from '../module/medicine/medicineRouter'
import clinicRouter from '../module/clinic/clinicRouter'
import prescriptionRouter from '../module/prescription/prescriptionRouter'
import prescriptionDetailRouter from '../module/prescriptionDetail/prescriptionDetailRouter'
import medicalExaminationRouter from '../module/medicalExamination/medicalExaminationRouter'

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
    app.use('/api/role', roleRouter);
    app.use('/api/medicine', medicineRouter);
    app.use('/api/clinic', clinicRouter);
    app.use('/api/prescription', prescriptionRouter);
    app.use('/api/prescriptionDetail', prescriptionDetailRouter);
    app.use('/api/medicalExamination', medicalExaminationRouter);


    //api get user with login
    return app.use("/", router);
}

module.exports = initWebRouters;