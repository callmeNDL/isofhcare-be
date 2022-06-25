import db from '../../models/index';
import bcrypt from 'bcrypt';

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      let hashed = await bcrypt.hashSync(password, salt);
      resolve(hashed);
    } catch (e) {
      reject(e);
    }
  });
};

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
  deleteDoctor: async (id) => {
    return new Promise(async (resolve, reject) => {
      //check id
      console.log("check id", id);

      try {
        let doctor = await db.Doctor.findOne({
          where: { id: id },
          raw: false
        })
        if (!doctor) {
          resolve({
            errCode: 1,
            errMessage: "doctor is not exist"
          })
        } else {
          if (await doctor.destroy()) {
            console.log("true");
          } else {
            console.log("false");
          }
          resolve({
            errCode: 0,
            errMessage: "The doctor is delete"
          })
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