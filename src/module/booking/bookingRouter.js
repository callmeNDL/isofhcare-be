import express from "express";
import bookingController from "./bookingController";
let router = express.Router();

router.get('/', bookingController.handleGetAllBookings);
router.get('/get-with-doctor', bookingController.handleGeBookingsWithMaBS);
router.get('/get-with-madl', bookingController.handleGeBookingsWithMaDL);
router.post('/create-booking', bookingController.handleCreateNewBooking);
router.post('/create-bookingUser', bookingController.handleCreateNewBookingUser);
router.delete('/delete-booking', bookingController.handleDeleteBooking);
router.put('/update-booking', bookingController.handleUpdateBooking);
router.put('/cancel-booking', bookingController.handleCancelBooking);
router.get('/by-user', bookingController.handleGetByUser);
router.post('/verify-booking', bookingController.handleVerifyBooking);

module.exports = router;