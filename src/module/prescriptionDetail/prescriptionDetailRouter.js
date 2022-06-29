import express from "express";
import prescriptionDetailController from "./prescriptionDetailController";
let router = express.Router();

router.get('/', prescriptionDetailController.handleGetAllPrescriptionDetails);
// router.post('/create-prescriptionDetail', prescriptionDetailController.handleCreateNewPrescriptionDetail);
// router.delete('/delete-prescriptionDetail', prescriptionDetailController.handleDeletePrescriptionDetail);
// router.put('/update-prescriptionDetail', prescriptionDetailController.handleUpdatePrescriptionDetail);

module.exports = router;