import express from "express";
import scheduleController from "./scheduleController";
let router = express.Router();

router.get('/', scheduleController.handleGetAllSchedules);
router.get('/get-with-dateBS', scheduleController.handleGetAllSchedulesWithDate);
router.post('/create-schedule', scheduleController.handleCreateNewSchedule);
router.delete('/delete-schedule', scheduleController.handleDeleteSchedule);
router.put('/update-schedule', scheduleController.handleUpdateSchedule);

module.exports = router;