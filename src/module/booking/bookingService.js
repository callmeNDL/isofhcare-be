import db from '../../models/index';

let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let user = await db.Booking.findOne({
        where: abc,
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const bookingServices = {
  getAllBookings: async (bookingId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let bookings = "";
        if (bookingId === "ALL") {
          bookings = await db.Booking.findAll();
        }
        if (bookingId && bookingId !== "ALL") {
          bookings = await db.Booking.findOne({
            where: { id: bookingId },
          });
        }
        resolve(bookings);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewBooking: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // check email exist
        let checkMaDL = await checkExist(data.MaDL, "MaDL");
        if (checkMaDL === true) {
          resolve({
            errCode: 1,
            errMessage: "MaDL is exist. Please try MaDL other",
          });
        } else {
          await db.Booking.create({
            MaDL: data.MaDL,
            MaUser: data.MaUser,
            MaBS: data.MaBS,
            ThoiGian: data.ThoiGian,
            NgayDL: data.NgayDL,
            TinhTrangBN: data.TinhTrangBN,
            TrangThai: data.TrangThai
          });
          resolve({
            errCode: 0,
            message: "OK",
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  deleteBooking: async (id) => {
    return new Promise(async (resolve, reject) => {
      //check id
      try {
        let booking = await db.Booking.findOne({
          where: { id: id },
          raw: false
        })
        if (!booking) {
          resolve({
            errCode: 1,
            errMessage: "booking is not exist"
          })
        } else {
          await booking.destroy();
          resolve({
            errCode: 0,
            errMessage: "The booking is delete"
          })
        }
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "booking is not delete"
        })
      }
    })
  },
  updateBooking: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 2,
            errMessage: "Messing requited parameter"
          });
        }
        let booking = await db.Booking.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (booking) {
          booking.MaDL = data.MaDL,
            booking.MaUser = data.MaUser,
            booking.MaBS = data.MaBS,
            booking.ThoiGian = data.ThoiGian,
            booking.NgayDL = data.NgayDL,
            booking.TinhTrangBN = data.TinhTrangBN,
            booking.TrangThai = data.TrangThai
          await booking.save();
          resolve({
            errCode: 0,
            errMessage: "update booking success!"
          })
        } else {
          resolve({
            errCode: 1,
            errMessage: "Booking not found!"
          });
        }

      } catch (e) {
        reject(e);
      }
    })
  }
}

module.exports = bookingServices