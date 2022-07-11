import express from "express";
import preDetailController from "./preDetailController";
let router = express.Router();

router.get('/', preDetailController.handleGetAllPreDetails);
router.post('/create-prescriptionDetail', preDetailController.handleCreateNewPreDetails);
router.delete('/delete-prescriptionDetail', preDetailController.handleDeletePreDetails);
router.put('/update-prescriptionDetail', preDetailController.handleUpdatePreDetails);

module.exports = router;