import express from "express";
import userController from "./userController";
import middlewareController from '../auth/middlewareController'
let router = express.Router();

router.get('/', userController.handleGetAllUsers);
router.post('/create-user', userController.handleCreateNewUser);
router.post('/change-password-user', userController.handleChangePassword);

router.delete('/delete-user', userController.handleDeleteUser);
router.put('/update-user', userController.handleUpdateUser);
router.post('/check-user', userController.handleCheckExistUser);

module.exports = router;