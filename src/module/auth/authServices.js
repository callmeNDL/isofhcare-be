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
  loginUser: async (username, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.User.findOne({
          where: { username: username },
        })
        if (!user) {
          resolve({
            errCode: 1,
            errMessage: "Username not exit",
          });
        } else {
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            resolve({
              errCode: 1,
              errMessage: "Wrong password!",
            });
          } else {
            var accessToken = authServices.generateAccessToken(user);
            var refreshToken = authServices.generateRefreshToken(user);
            const userResult = await db.User.findOne({
              where: { id: user.id },
              attributes: {
                exclude: ["password"],
              },
            })
            resolve({
              errCode: 0,
              errMessage: "user data",
              user: userResult, accessToken, refreshToken
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