import express from "express";
import bookingController from "./bookingController";
let router = express.Router();

router.get('/', bookingController.handleGetAllBookings);
router.get('/get-with-doctor', bookingController.handleGeBookingsWithMaBS);
router.post('/create-booking', bookingController.handleCreateNewBooking);
router.delete('/delete-booking', bookingController.handleDeleteBooking);
router.put('/update-booking', bookingController.handleUpdateBooking);
router.get('/by-user', bookingController.handleGetByUser);
router.post('/verify-booking', bookingController.handleVerifyBooking);

module.exports = router;