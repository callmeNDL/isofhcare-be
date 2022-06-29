import db from '../../models/index';
let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let data = await db.MedicalExamination.findOne({
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
const medicalExaminationServices = {
  getAllMedicalExamination: async (medicalExaminationID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let medicalExaminations = "";
        if (medicalExaminationID === "ALL") {
          medicalExaminations = await db.Schedule.findAll();
        }
        if (medicalExaminationID && medicalExaminationID !== "ALL") {
          medicalExaminations = await db.MedicalExamination.findOne({
            where: { id: medicalExaminationID },

          });
        }
        resolve(medicalExaminations);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewMedicalExamination: (data) => {
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
          await db.MedicalExamination.create({
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
  deleteMedicalExamination: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let medicalExamination = await db.MedicalExamination.findOne({
          where: { id: id },
          raw: false
        })
        if (!medicalExamination) {
          resolve({
            errCode: 1,
            errMessage: "MedicalExamination is not exist"
          })
        } else {
          let user = await db.User.findAll({
            where: { MaChucVu: medicalExamination.MaChucVu },
            raw: false
          })
          if (user.length != 0) {
            resolve({
              errCode: 1,
              errMessage: `MedicalExamination ${medicalExamination.TenChucVu} has an user`
            })
          } else {
            await medicalExamination.destroy();
            resolve({
              errCode: 0,
              errMessage: "The medicalExamination is delete"
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
  updateMedicalExamination: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 2,
            errMessage: "Messing requited parameter"
          });
        }
        let medicalExamination = await db.MedicalExamination.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (medicalExamination) {
          medicalExamination.MaChucVu = data.MaChucVu,
            medicalExamination.TenChucVu = data.TenChucVu,
            await medicalExamination.save();
          resolve({
            errCode: 0,
            errMessage: "update medicalExamination success!"
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

module.exports = medicalExaminationServices
