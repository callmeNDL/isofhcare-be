import express from "express";
import timetableController from "./timetableController";
let router = express.Router();

router.get('/', timetableController.handleGetAllTimetables);
// router.post('/create-timetable', timetableController.handleCreateNewTimetable);
// router.delete('/delete-timetable', timetableController.handleDeleteTimetable);
// router.put('/update-timetable', timetableController.handleUpdateTimetable);

module.exports = router;