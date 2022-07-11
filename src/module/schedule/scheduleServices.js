import db from '../../models/index';
let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let data = await db.Schedule.findOne({
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
const scheduleServices = {
  getAllSchedule: async (scheduleID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let schedules = "";
        if (scheduleID === "ALL") {
          schedules = await db.Schedule.findAll();
        }
        if (scheduleID && scheduleID !== "ALL") {
          schedules = await db.Schedule.findOne({
            where: { id: scheduleID },
          });
        }

        resolve(schedules);
      } catch (e) {
        reject(e);
      }
    });
  },
  getAllScheduleByMaBS: async (MaBS) => {
    return new Promise(async (resolve, reject) => {
      try {
        let schedules = "";
        if (MaBS) {
          schedules = await db.Schedule.findAll({
            where: { MaBS: MaBS },
          });
        }
        resolve(schedules);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewSchedule: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // let isSchedule = await db.Schedule.findOne({
        //   where: {
        //     MaBS: data.MaBS,
        //     MaPhong: data.MaPhong,
        //     CaKham: data.CaKham,
        //     NgayKham: data.NgayKham
        //   },
        // });
        // if (isSchedule) {
        //   resolve({
        //     errCode: 1,
        //     errMessage: "Schedule is exist. Please try Schedule other",
        //   });
        // } 
        await db.Schedule.create({
          MaBS: data.MaBS,
          MaPhong: data.MaPhong,
          CaKham: data.CaKham,
          NgayKham: data.NgayKham
        }).then(() => {
          resolve({
            errCode: 0,
            message: "Create complete",
          });
        }).catch((err) => {
          resolve({
            errCode: 0,
            message: "Create failure",
          });
        });

      } catch (e) {
        reject({
          errCode: 1,
          message: "Ma Chuc Vu đã tồn tại",
        });
      }
    });
  },
  deleteSchedule: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let schedule = await db.Schedule.findOne({
          where: { id: id },
          raw: false
        })
        if (!schedule) {
          resolve({
            errCode: 1,
            errMessage: "Schedule is not exist"
          })
        } else {
          await schedule.destroy();
          resolve({
            errCode: 0,
            errMessage: "The schedule is delete"
          })
        }
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "department is not delete"
        })
      }
    })
  },
  updateSchedule: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 2,
            errMessage: "Messing requited parameter"
          });
        }
        let schedule = await db.Schedule.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (schedule) {
          schedule.MaBS = data.MaBS,
            schedule.MaPhong = data.MaPhong,
            schedule.CaKham = data.CaKham,
            schedule.NgayKham = data.NgayKham
          await schedule.save();
          resolve({
            errCode: 0,
            errMessage: "update schedule success!"
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

module.exports = scheduleServices
