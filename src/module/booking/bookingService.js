import db from '../../models/index';
import senMailController from "../senMail/senMailController";
import { v4 as uuidv4 } from 'uuid';

let checkExist = (variable, filter, table) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let user = await db[`${table}`].findOne({
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
  getBookingByUser: async (userID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let bookings = "";
        bookings = await db.Booking.findAll({
          where: { MaUser: userID },
          include: [{
            model: db.User,
            as: "userData"
          },
          {
            model: db.Doctor,
            as: "doctorData"
          }],
          raw: true,
          nest: true
        })
        resolve({
          errCode: 0,
          errMessage: "Danh sách booking!",
          bookings
        })
      } catch (e) {
        resolve({
          errCode: 1,
          errMessage: "Lỗi tải dữ liệu",
          bookings
        })
      }
    });
  },
  createNewBooking: async (dataCreateBooking) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = dataCreateBooking.dataBooking;
        // check email exist
        let checkMaDL = await checkExist(data.MaDL, "MaDL", "Booking");
        let checkUser = await checkExist(data.MaUser, "MaUser", "User");
        let checkDoctor = await checkExist(data.MaBS, "MaBs", "Doctor");
        if (checkMaDL === true) {
          resolve({
            errCode: 1,
            errMessage: "Mã đặt lịch tồn tại!",
          });
        }
        if (checkUser === false) {
          resolve({
            errCode: 1,
            errMessage: "Bệnh nhân không tồn tại.",
          });
        }
        if (checkDoctor === false) {
          resolve({
            errCode: 1,
            errMessage: "Bác sĩ không tồn tại.",
          });
        } else {
          let token = uuidv4();
          let email = dataCreateBooking.datasenMail.email;
          let dataSendMail = dataCreateBooking.datasenMail.dataSend;
          if (dataSendMail.redirectLink.length === 0) {
            dataSendMail.redirectLink = `${process.env.BASE_URL_REACT}/verify-booking/${token}&${data.MaDL}`
          }
          await senMailController.handleSenMail(email, dataSendMail)
          await db.Booking.create({
            MaDL: data.MaDL,
            MaUser: data.MaUser,
            MaBS: data.MaBS,
            ThoiGian: data.ThoiGian,
            NgayDL: data.NgayDL,
            TinhTrangBN: data.TinhTrangBN,
            TrangThai: data.TrangThai,
            token: token
          });
          resolve({
            errCode: 0,
            message: "Đặt lịch gửi mail thành công",
          });
        }
      } catch (e) {
        resolve({
          errCode: 0,
          message: "Đặt lịch gửi mail thất bại",
        });
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
  },
  verifyBooking: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.token && !data.MaDL) {
          resolve({
            errCode: 1,
            errMessage: "Chưa truyền token, MaDL"
          })
        } else {
          let booking = await db.Booking.findOne({
            where: {
              MaDL: data.MaDL,
              token: data.token,
              TrangThai: "new"
            },
            raw: false
          })
          if (booking) {
            booking.TrangThai = "confirm";
            await booking.save()
            resolve({
              errCode: 0,
              errMessage: "Cập nhật lịch khám thành công"
            })
          } else {
            resolve({
              errCode: 1,
              errMessage: "Đặt lịch đã được kích hoạt hoặc không tồn tại!"
            })
          }
        }
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "Lỗi verify"
        })
      }
    })
  }
}

module.exports = bookingServices