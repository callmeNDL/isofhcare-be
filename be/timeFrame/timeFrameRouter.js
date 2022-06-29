import express from "express";
import timeFrameController from "./timeFrameController";
let router = express.Router();

router.get('/', timeFrameController.handleGetAllTimeFrames);
// router.post('/create-timeFrame', timeFrameController.handleCreateNewTimeFrame);
// router.delete('/delete-timeFrame', timeFrameController.handleDeleteTimeFrame);
// router.put('/update-timeFrame', timeFrameController.handleUpdateTimeFrame);

module.exports = router;