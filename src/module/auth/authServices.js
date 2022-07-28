import db from '../../models/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authServices = {
  generateAccessToken: (user) => {
    return jwt.sign({
      id: user.MaUser,
      admin: user.MaChucVu
    },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "2h" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign({
      id: user.MaUser,
      admin: user.MaChucVu
    },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "100d" }
    );
  },
  loginAdmin: async (username, password, role) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (role === "AD") {
          var user = await db.User.findOne({
            where: { username: username },
          })
        } else if (role === "BS") {
          var user = await db.Doctor.findOne({
            where: { username: username },
          })
        }
        if (!user) {
          resolve({
            errCode: 1,
            errMessage: "Tài khoảng không tồn tại ",
          });
        } else {
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            resolve({
              errCode: 1,
              errMessage: "Sai mật khẩu!",
            });
          } else {
            var accessToken = authServices.generateAccessToken(user);
            var refreshToken = authServices.generateRefreshToken(user);
            if (role === "AD") {
              var userResult = await db.User.findOne({
                where: { id: user.id },
                attributes: {
                  exclude: ["password"],
                },
              })
              resolve({
                errCode: 0,
                errMessage: "User đăng nhập thành công",
                user: userResult, accessToken
              });
            }
            if (role === "BS") {
              var userResult = await db.Doctor.findOne({
                where: { id: user.id },
                attributes: {
                  exclude: ["password"],
                },
              })
              resolve({
                errCode: 0,
                errMessage: "Bac sĩ đăng nhập thành công",
                user: userResult, accessToken
              });
            }

          }
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  loginUser: async (username, password, role) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.User.findOne({
          where: { username: username }
        })
        if (!user) {
          resolve({
            errCode: 1,
            errMessage: "Tên đăng nhập không tồn tại",
          });
        } else {
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            resolve({
              errCode: 1,
              errMessage: "Sai mật khẩu!",
            });
          } else {
            var accessToken = authServices.generateAccessToken(user);
            const userResult = await db.User.findOne({
              where: { id: user.id },
              attributes: {
                exclude: ["password"],
              },
            })
            resolve({
              errCode: 0,
              errMessage: "Thông tin user",
              user: user, accessToken

            });
          }
        }
      } catch (e) {
        reject(e);
      }
    });

  }
}

module.exports = authServices