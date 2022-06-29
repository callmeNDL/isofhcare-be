import express from "express";
import medicineController from "./medicineController";
let router = express.Router();

router.get('/', medicineController.handleGetAllMedicines);
router.post('/create-medicine', medicineController.handleCreateNewMedicine);
router.delete('/delete-medicine', medicineController.handleDeleteMedicine);
router.put('/update-medicine', medicineController.handleUpdateMedicine);


module.exports = router;