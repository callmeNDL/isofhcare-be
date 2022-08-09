import express from "express";
import departmentController from "./departmentController";
let router = express.Router();

router.get('/', departmentController.handleGetAllDepartments);
router.get('/doctor-with-department', departmentController.handleGetAllDoctor);
router.post('/create-department', departmentController.handleCreateNewDepartment);
router.delete('/delete-department', departmentController.handleDeleteDepartment);
router.put('/update-department', departmentController.handleUpdateDepartment);

module.exports = router;