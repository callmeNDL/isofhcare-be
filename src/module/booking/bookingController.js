import bookingServices from './bookingService'
const bookingController = {
  handleGetAllBookings: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        bookings: [],
      });
    }
    let bookings = await bookingServices.getAllBookings(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      bookings,
    });
  },
  handleCreateNewBooking: async (req, res) => {
    let message = await bookingServices.createNewBooking(req.body);
    return res.status(200).json(message);
  },
  handleDeleteBooking: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters!',
      })
    } else {
      let message = await bookingServices.deleteBooking(req.body.id);
      return res.status(200).json(message);
    }
  },
}

module.exports = bookingController