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
      let user = await db.User.findOne({
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

const userServices = {
  getAllUsers: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let users = "";
        if (userId === "ALL") {
          users = await db.User.findAll({
            attributes: {
              exclude: ["password"],
            },
          });
        }
        if (userId && userId !== "ALL") {
          users = await db.User.findOne({
            where: { id: userId },
            attributes: {
              exclude: ["password"],
            },
          });
        }

        resolve(users);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewUser: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // check email exist
        let checkSDT = await checkExist(data.SDT, "SDT");
        let checkUser = await checkExist(data.MaUser, "MaUser");
        let checkEmail = await checkExist(data.email, "email");
        let checkCMND = await checkExist(data.CMND, "CMND");
        let checkUsername = await checkExist(data.username, "username");
        if (checkUsername === true) {
          resolve({
            errCode: 1,
            errMessage: "Username is exist. Please try Username other",
          });
        } if (checkUser === true) {
          resolve({
            errCode: 1,
            errMessage: "User is exist. Please try MaUser other",
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
          // console.log(data);
          await db.User.create({
            MaUser: data.MaUser,
            MaChucVu: data.MaChucVu,
            CMND: data.CMND,
            HoTen: data.HoTen,
            NgaySinh: data.NgaySinh,
            DiaChi: data.DiaChi,
            GioiTinh: data.GioiTinh,
            SDT: data.SDT,
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
  deleteUser: async (id) => {
    return new Promise(async (resolve, reject) => {
      //check id
      try {
        let user = await db.User.findOne({
          where: { id: id },
          raw: false
        })
        if (!user) {
          resolve({
            errCode: 1,
            errMessage: "user is not exist"
          })
        } else {
          let booking = await db.Booking.findAll({
            where: { MaUser: user.MaUser },
            raw: false
          })
          if (booking.length != 0) {
            resolve({
              errCode: 1,
              errMessage: `User ${user.MaUser}  has an appointment`
            })
          } else {
            await user.destroy();
            resolve({
              errCode: 0,
              errMessage: "The user is delete"
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
  },
  updateUser: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 2,
            errMessage: "Messing requited parameter"
          });
        }
        let user = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (user) {
          user.MaChucVu = data.MaChucVu,
            user.HoTen = data.HoTen,
            user.NgaySinh = data.NgaySinh,
            user.DiaChi = data.DiaChi,
            user.GioiTinh = data.GioiTinh,
            user.SDT = data.SDT,
            user.CMND = data.CMND,
            user.email = data.email,
            user.HinhAnh = data.HinhAnh,
            await user.save();
          resolve({
            errCode: 0,
            errMessage: "update user success!"
          })
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
  }

}

module.exports = userServices