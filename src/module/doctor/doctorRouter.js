import express from "express";
import doctorController from "./doctorController";
let router = express.Router();

router.get('/', doctorController.handleGetAllDoctors);
router.post('/create-doctor', doctorController.handleCreateNewDoctor);
router.delete('/delete-doctor', doctorController.handleDeleteDoctor);
router.put('/update-doctor', doctorController.handleUpdateDoctor);
router.post('/check-doctor', doctorController.handleCheckExistDoctor);

module.exports = router;