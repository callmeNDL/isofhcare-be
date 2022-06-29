import db from '../../models/index';
let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let data = await db.TimeFrame.findOne({
        where: abc,
      });
      if (data) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
const timeFrameServices = {
  getAllTimeFrame: async (timeFrameID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let timeFrames = "";
        if (timeFrameID === "ALL") {
          timeFrames = await db.TimeFrame.findAll();
        }
        if (timeFrameID && timeFrameID !== "ALL") {
          timeFrames = await db.TimeFrame.findOne({
            where: { id: timeFrameID },
          });
        }

        resolve(timeFrames);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewTimeFrame: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let checkMaChucVu = await checkExist(data.MaChucVu, "MaChucVu");
        let checkTenChucVu = await checkExist(data.TenChucVu, "TenChucVu");

        if (checkMaChucVu) {
          resolve({
            errCode: 1,
            errMessage: "MaChucVu is exist. Please try MaChucVu other",
          });
        }
        if (checkTenChucVu) {
          resolve({
            errCode: 1,
            errMessage: "TenChucVu is exist. Please try TenChucVu other",
          });
        } else {
          await db.TimeFrame.create({
            MaChucVu: data.MaChucVu,
            TenChucVu: data.TenChucVu,
          });
          resolve({
            errCode: 0,
            message: "Create complete",
          });
        }
      } catch (e) {
        reject({
          errCode: 1,
          message: "Ma Chuc Vu đã tồn tại",
        });
      }
    });
  },
  deleteTimeFrame: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let timeFrame = await db.TimeFrame.findOne({
          where: { id: id },
          raw: false
        })
        if (!timeFrame) {
          resolve({
            errCode: 1,
            errMessage: "TimeFrame is not exist"
          })
        } else {
          let user = await db.User.findAll({
            where: { MaChucVu: timeFrame.MaChucVu },
            raw: false
          })
          if (user.length != 0) {
            resolve({
              errCode: 1,
              errMessage: `TimeFrame ${timeFrame.TenChucVu} has an user`
            })
          } else {
            await timeFrame.destroy();
            resolve({
              errCode: 0,
              errMessage: "The timeFrame is delete"
            })
          }
        }
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "department is not delete"
        })
      }
    })
  },
  updateTimeFrame: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 2,
            errMessage: "Messing requited parameter"
          });
        }
        let timeFrame = await db.TimeFrame.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (timeFrame) {
          timeFrame.MaChucVu = data.MaChucVu,
            timeFrame.TenChucVu = data.TenChucVu,
            await timeFrame.save();
          resolve({
            errCode: 0,
            errMessage: "update timeFrame success!"
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

module.exports = timeFrameServices
