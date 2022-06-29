import express from "express";
import clinicController from "./clinicController";
let router = express.Router();

router.get('/', clinicController.handleGetAllClinics);
router.post('/create-clinic', clinicController.handleCreateNewClinic);
router.delete('/delete-clinic', clinicController.handleDeleteClinic);
router.put('/update-clinic', clinicController.handleUpdateClinic);


module.exports = router;