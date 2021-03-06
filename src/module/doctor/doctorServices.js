import db from '../../models/index';
import bcrypt from 'bcrypt';

let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let user = await db.Doctor.findOne({
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

const doctorServices = {
  getAllDoctors: async (doctorID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let doctors = "";
        if (doctorID === "ALL") {
          doctors = await db.Doctor.findAll({
            attributes: {
              exclude: ["password"],
            },
          });
        }
        if (doctorID && doctorID !== "ALL") {
          doctors = await db.Doctor.findOne({
            where: { id: doctorID },
            attributes: {
              exclude: ["password"],
            },
          });
        }

        resolve(doctors);
      } catch (e) {
        reject(e);
      }
    });
  },
  checkExistDoctor: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // check email exist
        let checkSDT = await checkExist(data.SDT, "SDT");
        let checkMaBS = await checkExist(data.MaBS, "MaBS");
        let checkEmail = await checkExist(data.email, "email");
        let checkCMND = await checkExist(data.CMND, "CMND");
        let checkUsername = await checkExist(data.username, "username");
        if (checkUsername === true) {
          resolve({
            errCode: 1,
            errMessage: "Username is exist. Please try Username other",
          });
        } if (checkMaBS === true) {
          resolve({
            errCode: 1,
            errMessage: "Doctor is exist. Please try MaDoctor other",
          });
        } if (checkSDT === true) {
          resolve({
            errCode: 1,
            errMessage: "SDT is exist. Please try SDT other",
          });
        } if (checkEmail === true) {
          resolve({
            errCode: 1,
            errMessage: "email is exist. Please try email other",
          });
        }
        if (checkCMND === true) {
          resolve({
            errCode: 1,
            errMessage: "CMND is exist. Please try CMND other",
          });
        }
        else {
          resolve({
            errCode: 0,
            message: "User not exist",
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewDoctor: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // check email exist
        let checkSDT = await checkExist(data.SDT, "SDT");
        let checkMaBS = await checkExist(data.MaBS, "MaBS");
        let checkEmail = await checkExist(data.email, "email");
        let checkCMND = await checkExist(data.CMND, "CMND");
        let checkUsername = await checkExist(data.username, "username");
        if (checkUsername === true) {
          resolve({
            errCode: 1,
            errMessage: "Username is exist. Please try Username other",
          });
        } if (checkMaBS === true) {
          resolve({
            errCode: 1,
            errMessage: "Doctor is exist. Please try MaDoctor other",
          });
        } if (checkSDT === true) {
          resolve({
            errCode: 1,
            errMessage: "SDT is exist. Please try SDT other",
          });
        } if (checkEmail === true) {
          resolve({
            errCode: 1,
            errMessage: "email is exist. Please try email other",
          });
        }
        if (checkCMND === true) {
          resolve({
            errCode: 1,
            errMessage: "CMND is exist. Please try CMND other",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          let hashPassword = await bcrypt.hashSync(data.password, salt);
          await db.Doctor.create({
            MaBS: data.MaBS,
            MaKhoa: data.MaKhoa,
            CMND: data.CMND,
            HoTen: data.HoTen,
            NgaySinh: data.NgaySinh,
            DiaChi: data.DiaChi,
            GioiTinh: data.GioiTinh,
            SDT: data.SDT,
            ChuyenNganh: data.ChuyenNganh,
            username: data.username,
            email: data.email,
            HinhAnh: data.HinhAnh,
            password: hashPassword
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
  updateDoctor: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 1,
            errMessage: "Messing requited parameter"
          });
        }
        let doctor = await db.Doctor.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (doctor) {
          if (data.CMND === doctor.CMND) {
            doctor.MaKhoa = data.MaKhoa,
              doctor.CMND = data.CMND,
              doctor.HoTen = data.HoTen,
              doctor.NgaySinh = data.NgaySinh,
              doctor.DiaChi = data.DiaChi,
              doctor.GioiTinh = data.GioiTinh,
              doctor.ChuyenNganh = data.ChuyenNganh,
              doctor.HinhAnh = data.HinhAnh,
              await doctor.save();
            resolve({
              errCode: 0,
              errMessage: "update doctor success!"
            })
          } else {
            let checkCMND = await checkExist(data.CMND, "CMND");
            if (checkCMND === true) {
              console.log("t???n t???i");
              resolve({
                errCode: 1,
                errMessage: "CMND ???? t???n t???i.",
              });
            } else {
              doctor.MaKhoa = data.MaKhoa,
                doctor.CMND = data.CMND,
                doctor.HoTen = data.HoTen,
                doctor.NgaySinh = data.NgaySinh,
                doctor.DiaChi = data.DiaChi,
                doctor.GioiTinh = data.GioiTinh,
                doctor.ChuyenNganh = data.ChuyenNganh,
                doctor.HinhAnh = data.HinhAnh,
                await doctor.save();
              resolve({
                errCode: 0,
                errMessage: "C???p nh???t th??nh c??ng"
              })
            }
          }

        } else {
          resolve({
            errCode: 1,
            errMessage: "User not found!"
          });
        }

      } catch (e) {
        reject(e);
      }
    })
  },
  deleteDoctor: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let doctor = await db.Doctor.findOne({
          where: { id: id },
          raw: false
        })
        console.log(doctor);
        if (!doctor) {
          resolve({
            errCode: 1,
            errMessage: "Kh??ng t???n t???i b??c s??"
          })
        } else {
          let booking = await db.Booking.findAll({
            where: { MaBS: doctor.MaBS },
            raw: false
          })
          let schedule = await db.Schedule.findAll({
            where: { MaBS: doctor.MaBS },
            raw: false
          })
          let medicalTests = await db.MedicalTests.findAll({
            where: { MaBS: doctor.MaBS },
            raw: false
          })
          if (booking.length !== 0) {
            resolve({
              errCode: 1,
              errMessage: "B??c s?? kh??ng th??? xo?? v?? ??ang c?? l???ch kh??m"
            })
          }
          else {
            await doctor.destroy();
            resolve({
              errCode: 0,
              errMessage: "The doctor is delete"
            })
          }
        }
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "user is not delete"
        })
      }
    })
  }
}

module.exports = doctorServices