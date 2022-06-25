import express from "express";
import bookingController from "./bookingController";
let router = express.Router();

router.get('/', bookingController.handleGetAllBookings);
router.post('/create-booking', bookingController.handleCreateNewBooking);
router.delete('/delete-booking', bookingController.handleDeleteBooking);

module.exports = router;