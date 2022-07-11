import db from '../../models/index';
let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let data = await db.Timetables.findOne({
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
const timetableServices = {
  getAllTimetable: async (timetableID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let timetables = "";
        if (timetableID === "ALL") {
          timetables = await db.Timetables.findAll();
        }
        if (timetableID && timetableID !== "ALL") {
          timetables = await db.Timetables.findOne({
            where: { id: timetableID },

          });
        }
        resolve(timetables);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewTimetable: (data) => {
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
          await db.Timetables.create({
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
  deleteTimetable: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let timetable = await db.Timetables.findOne({
          where: { id: id },
          raw: false
        })
        if (!timetable) {
          resolve({
            errCode: 1,
            errMessage: "Timetable is not exist"
          })
        } else {
          let user = await db.User.findAll({
            where: { MaChucVu: timetable.MaChucVu },
            raw: false
          })
          if (user.length != 0) {
            resolve({
              errCode: 1,
              errMessage: `Timetable ${timetable.TenChucVu} has an user`
            })
          } else {
            await timetable.destroy();
            resolve({
              errCode: 0,
              errMessage: "The timetable is delete"
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
  updateTimetable: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 2,
            errMessage: "Messing requited parameter"
          });
        }
        let timetable = await db.Timetables.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (timetable) {
          timetable.MaChucVu = data.MaChucVu,
            timetable.TenChucVu = data.TenChucVu,
            await timetable.save();
          resolve({
            errCode: 0,
            errMessage: "update timetable success!"
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

module.exports = timetableServices
