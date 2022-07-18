import db from '../../models/index';
import bcrypt from 'bcrypt';


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
            include: { model: db.Role },
            raw: true,
            nest: true
          });
        }
        if (userId && userId !== "ALL") {
          users = await db.User.findOne({
            where: { id: userId },
            attributes: {
              exclude: ["password"],
            },
            include: [{
              model: db.Role,
            }],
            raw: true,
            nest: true
          });
        }
        resolve(users);
      } catch (e) {
        reject(e);
      }
    });
  },
  checkExistUser: async (data) => {
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
            errMessage: "Tên đăng nhập đã tồn tại.",
          });
        } if (checkUser === true) {
          resolve({
            errCode: 1,
            errMessage: "Mã User đã tồn tại",
          });
        } if (checkSDT === true) {
          resolve({
            errCode: 1,
            errMessage: "SDT đã tồn tại.",
          });
        } if (checkEmail === true) {
          resolve({
            errCode: 1,
            errMessage: "email đã tồn tại.",
          });
        }
        if (checkCMND === true) {
          resolve({
            errCode: 1,
            errMessage: "CMND đã tồn tại.",
          });
        } else {
          resolve({
            errCode: 0,
            message: "Không tồn tại user",
          });
        }
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
            errMessage: "Username đã tồn tại.",
          });
        } if (checkUser === true) {
          resolve({
            errCode: 1,
            errMessage: "User đã tồn tại.",
          });
        } if (checkSDT === true) {
          resolve({
            errCode: 1,
            errMessage: "SDT đã tồn tại.",
          });
        } if (checkEmail === true) {
          resolve({
            errCode: 1,
            errMessage: "email đã tồn tại.",
          });
        }
        if (checkCMND === true) {
          resolve({
            errCode: 1,
            errMessage: "CMND đã tồn tại.",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          let hashPassword = await bcrypt.hashSync(data.password, salt);
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
            message: "Tại mới thành công",
          });
        }
      } catch (e) {
        reject({
          errCode: 0,
          message: "Tại mới thất bại",
        });
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
              errMessage: `User ${user.MaUser} đang có lịch khám`
            })
          } else {
            await user.destroy();
            resolve({
              errCode: 0,
              errMessage: "Xoá thành công."
            })
          }
        }
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "Không thể xoá User"
        })
      }
    })
  },
  updateUser: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.id) {
          resolve({
            errCode: 1,
            errMessage: "Messing requited parameter"
          });
        }
        let user = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (user) {
          if (data.CMND === user.CMND) {
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
              errMessage: "Cập nhật thành congp!"
            })
          } else {
            let checkCMND = await checkExist(data.CMND, "CMND");
            if (checkCMND === true) {
              console.log("tồn tại");
              resolve({
                errCode: 1,
                errMessage: "CMND đã tồn tại.",
              });
            } else {
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
                errMessage: "Cập nhật thành công"
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
        reject({
          errCode: 1,
          errMessage: "Cập nhật thất bại"
        });
      }
    })
  }

}

module.exports = userServices