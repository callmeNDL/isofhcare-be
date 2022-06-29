import express from "express";
import roleController from "./roleController";
let router = express.Router();

router.get('/', roleController.handleGetAllRoles);
router.post('/create-role', roleController.handleCreateNewRole);
router.delete('/delete-role', roleController.handleDeleteRole);
router.put('/update-role', roleController.handleUpdateRole);

module.exports = router;