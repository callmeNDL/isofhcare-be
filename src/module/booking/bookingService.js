import db from '../../models/index';
import senMailController from "../senMail/senMailController";
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import medicalExaminationServices from '../medicalExamination/medicalExaminationServices'

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
function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(), // get only two digits
    month = datePart[1], day = datePart[2];
  return day + '/' + month + '/' + year;
}

const bookingServices = {
  getAllBookings: async (bookingId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let bookings = "";
        if (bookingId === "ALL") {
          bookings = await db.Booking.findAll({
            include: [
              { model: db.Doctor, attributes: { exclude: ["password"], } },
              { model: db.User, attributes: { exclude: ["password"], } },
              { model: db.MedicalExaminations },

            ],
          });
        }
        if (bookingId && bookingId !== "ALL") {
          bookings = await db.Booking.findOne({
            where: { id: bookingId },

          });
        }
        if (!bookings) {
          resolve({});
        }
        resolve(bookings);
      } catch (e) {
        reject(e);
      }
    });
  },
  getBookingWithMaDL: async (MaDL) => {
    return new Promise(async (resolve, reject) => {
      try {
        let bookings = "";
        bookings = await db.Booking.findOne({
          where: { MaDL: MaDL },
          include: [
            { model: db.Doctor, attributes: { exclude: ["password"], }, },
            { model: db.User, attributes: { exclude: ["password"], }, },
          ],
        });
        resolve(bookings);
      } catch (e) {
        reject(e);
      }
    });
  },
  getBookingWithMaBS: async (MaBS) => {
    return new Promise(async (resolve, reject) => {
      try {
        let bookings = "";
        bookings = await db.Booking.findAll({
          where: { MaBS: MaBS },
          include: [
            { model: db.Doctor, attributes: { exclude: ["password"], }, },
            { model: db.User, attributes: { exclude: ["password"], }, },

          ],
        });
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
          include: [
            { model: db.Doctor, attributes: { exclude: ["password"], }, },
            { model: db.User, attributes: { exclude: ["password"], }, },
            { model: db.MedicalExaminations },
          ],
        });
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
        let uid = Number((new Date().getTime()).toString().slice(-6));
        if (uid <= 9999) {
          uid + 10000
        }
        let data = dataCreateBooking;
        let token = uuidv4();

        const bookings = await db.Booking.findAll({
          where: {
            MaUser: data.MaUser,
            NgayDL: data.NgayDL,
            CaKham: data.CaKham,
          }
        })

        //   // check email exist
        const total = await db.Booking.findAll({
          where: {
            MaBS: data.MaBS,
            NgayDL: data.NgayDL,
            CaKham: data.CaKham,
            TrangThai: {
              [Op.ne]: 'cancel',
            }
          }
        })
        let maximunOfTime = 0;
        if (data.ThoiGian !== '0') {
          const totalTime = await db.Booking.findAll({
            where: {
              MaBS: data.MaBS,
              NgayDL: data.NgayDL,
              CaKham: data.CaKham,
              ThoiGian: data.ThoiGian,
              TrangThai: {
                [Op.ne]: 'cancel',
              }
            }
          })
          maximunOfTime = totalTime.length;
          if (maximunOfTime >= 2) {
            resolve({
              errCode: 1,
              errMessage: `So luong người đặt thời gian :${data.ThoiGian} đã hết`,
            });
          }
        }
        if (total.length > 10) {
          resolve({
            errCode: 1,
            errMessage: `So luong người đặt thời gian :${data.CaKham} đã hết`,
          });
        }
        let create = false;
        if (bookings.length === 0 && total.length <= 10 && maximunOfTime < 2) {
          await db.Booking.create({
            MaDL: uid,
            MaUser: data.MaUser,
            MaBS: data.MaBS,
            ThoiGian: data.ThoiGian,
            NgayDL: data.NgayDL,
            TinhTrangBN: data.TinhTrangBN,
            TrangThai: data.TrangThai,
            token: token,
            CaKham: data.CaKham,
          }).then(() => {
            resolve({
              errCode: 0,
              errMessage: "Thêm thêm thành công",
            });
          }).catch((err) => {
            console.log(err);
            create = false;
            resolve({
              errCode: 1,
              errMessage: "Thêm thất bại",
            });
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: `Ngày ${formatDate(data.NgayDL)} ${data.CaKham === "Ca1" ? "08:00 - 11:00" : "13:00 - 16:00"} bạn đã có lịch khám`,
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
  createNewBookingUser: async (dataCreateBooking) => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = dataCreateBooking.dataBooking;
        // check email exist
        let token = uuidv4();

        const bookings = await db.Booking.findAll({
          where: {
            MaUser: data.MaUser,
            NgayDL: data.NgayDL,
            CaKham: data.CaKham,
          }
        })
        // cout booking
        const total = await db.Booking.findAll({
          where: {
            MaBS: data.MaBS,
            NgayDL: data.NgayDL,
            CaKham: data.CaKham,
            TrangThai: {
              [Op.ne]: 'cancel',
            }
          }
        })
        let maximunOfTime = 0;
        if (data.ThoiGian !== '0') {
          const totalTime = await db.Booking.findAll({
            where: {
              MaBS: data.MaBS,
              NgayDL: data.NgayDL,
              CaKham: data.CaKham,
              ThoiGian: data.ThoiGian,
              TrangThai: {
                [Op.ne]: 'cancel',
              }
            }
          })
          maximunOfTime = totalTime.length;
          if (maximunOfTime >= 2) {
            resolve({
              errCode: 1,
              errMessage: `So luong người đặt thời gian :${data.ThoiGian} đã hết`,
            });
          }
        }
        if (total.length > 10) {
          resolve({
            errCode: 1,
            errMessage: `So luong người đặt thời gian :${data.CaKham} đã hết`,
          });
        }

        // hanleBooking
        let create = false;
        if (bookings.length === 0 && total.length <= 10 && maximunOfTime < 2) {
          await db.Booking.create({
            MaDL: data.MaDL,
            MaUser: data.MaUser,
            MaBS: data.MaBS,
            ThoiGian: data.ThoiGian,
            NgayDL: data.NgayDL,
            TinhTrangBN: data.TinhTrangBN,
            TrangThai: data.TrangThai,
            token: token,
            CaKham: data.CaKham,
          }).then(() => {
            create = true;
          }).catch((err) => {
            console.log(err);
            create = false;
            resolve({
              errCode: 1,
              errMessage: "Thêm thất bại",
            });
          });;
          if (create) {
            let email = dataCreateBooking.datasenMail.email;
            let dataSendMail = dataCreateBooking.datasenMail.dataSend;
            if (dataSendMail.redirectLink.length === 0) {
              dataSendMail.redirectLink = `${process.env.BASE_URL_REACT}/verify-booking/${token}&${data.MaDL}`
            }
            await senMailController.handleSenMail(email, dataSendMail);
            resolve({
              errCode: 0,
              message: "Đặt lịch thành công",
            });
          }
        } else {
          resolve({
            errCode: 1,
            errMessage: `Ngày ${formatDate(data.NgayDL)} ${data.CaKham === "Ca1" ? "08:00 - 11:00" : "13:00 - 16:00"} bạn đã có lịch khám`,
          });
        }

      } catch (e) {
        resolve({
          errCode: 1,
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
          if (booking.TrangThai === 'failure') {
            await booking.destroy().then(() => {
              resolve({
                errCode: 0,
                errMessage: "Xoá thành công",
              });
            }).catch((err) => {
              console.log(err);
              resolve({
                errCode: 1,
                errMessage: "Đặt lịch đã có phiếu khám",
              });
            });;
          } else {
            resolve({
              errCode: 1,
              errMessage: "Trạng thái không thể xoá",
            });
          }

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
        let update = false;
        if (booking) {
          booking.MaDL = data.MaDL,
            booking.MaUser = data.MaUser,
            booking.MaBS = data.MaBS,
            booking.ThoiGian = data.ThoiGian,
            booking.NgayDL = data.NgayDL,
            booking.TinhTrangBN = data.TinhTrangBN,
            booking.TrangThai = data.TrangThai
          await booking.save().then(() => {
            update = true;
          }).catch((err) => {
            console.log(err);
            update = false;
          });
          const phongKham = await db.Schedule.findOne({
            where: {
              MaBS: data.MaBS,
              CaKham: data.CaKham,
              NgayKham: data.NgayDL,
            },
            include: [{
              model: db.Clinic,
            }],
            raw: true,
            nest: true
          })
          if (data.TrangThai === 'waiting' && update) {
            let uid = Number((new Date().getTime()).toString().slice(-6));
            if (uid <= 9999) {
              uid + 10000
            }
            await db.MedicalExaminations.create({
              MaPK: uid,
              MaDL: data.MaDL,
              CaKham: data.CaKham,
              NgayKham: data.NgayDL,
              KetQua: "",
              ThoiGianKham: data.ThoiGian,
              MaPhong: phongKham.MaPhong,
              TenPK: `Khám ${phongKham.Clinic.TenPhongKham}`
            }).then(() => {
              resolve({
                errCode: 0,
                errMessage: "Thêm thành công",
              });
            }).catch((err) => {
              console.log(err);
              resolve({
                errCode: 1,
                errMessage: "Thêm thất bại",
              });
            });
          }
          resolve({
            errCode: 0,
            errMessage: "Thêm thành công",
          });
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
            booking.TrangThai = "confirmed";
            await booking.save().then(() => {
              resolve({
                errCode: 0,
                errMessage: "Cập nhật trạng thái đặt lịch thành công!"
              })
            }).catch((err) => {
              console.log(err);
              resolve({
                errCode: 1,
                errMessage: "Cập nhật trạng thái đặt lịch thất bại!"
              })
            });


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
  },
  cancelBooking: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.MaDL) {
          resolve({
            errCode: 2,
            errMessage: "Messing requited parameter"
          });
        }
        let booking = await db.Booking.findOne({
          where: { MaDL: data.MaDL },
          raw: false,
        });
        let update = true;
        if (booking && booking.TrangThai !== 'cancel') {
          booking.TrangThai = "cancel"
          await booking.save().then(() => {
            update = true;
          }).catch((err) => {
            console.log(err);
            resolve({
              errCode: 1,
              errMessage: "Cập nhật thất bại",
            });
          });

          if (update) {
            const medical = await db.MedicalExaminations.findOne({
              where: {
                MaDL: booking.MaDL
              }
            })
            if (medical) {
              await medical.destroy().then(() => {
                resolve({
                  errCode: 0,
                  errMessage: "Xoá thành công",
                });
              }).catch((err) => {
                console.log(err);
                resolve({
                  errCode: 1,
                  errMessage: "Đặt lịch đã có phiếu khám",
                });
              });
            }
            resolve({
              errCode: 0,
              errMessage: "Cập nhật thành công",
            });
          }
        } else {
          resolve({
            errCode: 1,
            errMessage: "Trạng thái đặt lịch hện tại đã huỷ!"
          });
        }

      } catch (e) {
        reject(e);
      }
    })
  },
}

module.exports = bookingServices