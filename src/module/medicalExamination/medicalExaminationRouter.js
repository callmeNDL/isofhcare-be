import express from "express";
import medicalExaminationController from "./medicalExaminationController";
let router = express.Router();

router.get('/', medicalExaminationController.handleGetAllMedicalExaminations);
router.post('/create-medicalExamination', medicalExaminationController.handleCreateNewMedicalExamination);
// router.delete('/delete-medicalExamination', medicalExaminationController.handleDeleteMedicalExamination);
router.put('/update-medicalExamination', medicalExaminationController.handleUpdateMedicalExamination);

module.exports = router;