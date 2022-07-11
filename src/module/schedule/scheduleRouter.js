import express from "express";
import scheduleController from "./scheduleController";
let router = express.Router();

router.get('/', scheduleController.handleGetAllSchedules);
router.post('/create-schedule', scheduleController.handleCreateNewSchedule);
router.delete('/delete-schedule', scheduleController.handleDeleteSchedule);
router.put('/update-schedule', scheduleController.handleUpdateSchedule);

module.exports = router;