import bookingServices from './bookingService'
const bookingController = {
  handleGetAllBookings: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Nhập id đặt lịch",
        bookings: [],
      });
    }
    let bookings = await bookingServices.getAllBookings(id);
    return res.status(200).json({
      errCode: bookings.errCode,
      errMessage: bookings.errMessage,
      bookings,
    });
  },
  handleGeBookingsWithMaBS: async (req, res) => {
    let MaBS = req.query.MaBS;
    if (!MaBS) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Nhập Mã bác sĩ",
        bookings: [],
      });
    }
    let bookings = await bookingServices.getBookingWithMaBS(MaBS);
    return res.status(200).json({
      errCode: 0,
      errMessage: `Danh sách đặt lịch của bác sĩ ${MaBS}`,
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
        errMessage: 'Thiếu các thông số bắt buộc!',
      })
    } else {
      let message = await bookingServices.deleteBooking(req.body.id);
      if (message.errCode === 1) {
        return res.status(200).json({
          errCode: 1,
          errMessage: `Booking ${req.body.id} is not delete`
        });
      } else {
        return res.status(200).json(message);
      }
    }
  },
  handleUpdateBooking: async (req, res) => {
    let message = await bookingServices.updateBooking(req.body);
    return res.status(200).json(message)
  },
  handleGetByUser: async (req, res) => {
    let userID = req.query.MaUser;
    if (!userID) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Nhâp mã User",
        bookings: [],
      });
    }
    let bookings = await bookingServices.getBookingByUser(userID);
    return res.status(200).json({
      errCode: bookings.errCode,
      errMessage: bookings.errMessage,
      bookings: bookings.bookings,
    });
  },
  handleVerifyBooking: async (req, res) => {
    try {
      let info = await bookingServices.verifyBooking(req.body)
      return res.status(200).json({
        errCode: info.errCode,
        errMessage: info.errMessage
      })
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        errCode: 1,
        errMessage: "Lỗi server!!!"
      })
    }
  }
}

module.exports = bookingController