import express from "express";
import userController from "./userController";
let router = express.Router();

router.get('/', userController.handleGetAllUsers);
router.post('/create-user', userController.handleCreateNewUser);
router.delete('/delete-user', userController.handleDeleteUser);
router.put('/update-user', userController.handleUpdateUser);


module.exports = router;