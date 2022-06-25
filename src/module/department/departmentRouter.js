import express from "express";
import departmentController from "./departmentController";
let router = express.Router();

router.get('/', departmentController.handleGetAllDepartments);
router.post('/create-department', departmentController.handleCreateNewDepartment);
router.delete('/delete-department', departmentController.handleDeleteDepartment);

module.exports = router;