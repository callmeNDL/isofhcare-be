import db from '../../models/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authServices = {
  loginUser: async (username, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.User.findOne({
          where: { username: username }
        })
        if (!user) {
          resolve({
            errCode: 1,
            errMessage: "username not exit",
          });
        } else {
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            resolve({
              errCode: 1,
              errMessage: "Wrong password!",
            });
          } else {
            if (user.MaChucVu == '2') {
              var accessToken = jwt.sign({
                id: user.MaUser,
                admin: user.MaChucVu
              },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: "30s" }
              )
              resolve({
                errCode: 0,
                errMessage: "user data",
                user: user, accessToken

              });
            } else {
              resolve({
                errCode: 1,
                errMessage: "You are not an administrator in the system",
              });
            }

          }
        }
      } catch (e) {
        reject(e);
      }
    });

  }
}

module.exports = authServices