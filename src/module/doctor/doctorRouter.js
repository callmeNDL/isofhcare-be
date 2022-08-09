import express from "express";
import doctorController from "./doctorController";
let router = express.Router();

router.get('/', doctorController.handleGetAllDoctors);
router.get('/limit', doctorController.handlePagination);
router.post('/create-doctor', doctorController.handleCreateNewDoctor);
router.get('/search-doctor', doctorController.handleSearch);
router.delete('/delete-doctor', doctorController.handleDeleteDoctor);
router.put('/update-doctor', doctorController.handleUpdateDoctor);
router.post('/check-doctor', doctorController.handleCheckExistDoctor);

module.exports = router;