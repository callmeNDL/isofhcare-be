import express from "express";
import prescriptionController from "./prescriptionController";
let router = express.Router();

router.get('/', prescriptionController.handleGetAllPrescriptions);
router.post('/create-prescription', prescriptionController.handleCreateNewPrescription);
router.delete('/delete-prescription', prescriptionController.handleDeletePrescription);
router.put('/update-prescription', prescriptionController.handleUpdatePrescription);


module.exports = router;