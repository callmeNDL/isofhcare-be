import express from "express";
import medicalTestController from "./medicalTestController";
let router = express.Router();

router.get('/', medicalTestController.handleGetAllMedicalTests);
router.post('/create-medicalTest', medicalTestController.handleCreateNewMedicalTest);
router.delete('/delete-medicalTest', medicalTestController.handleDeleteMedicalTest);
router.put('/update-medicalTest', medicalTestController.handleUpdateMedicalTest);

module.exports = router;