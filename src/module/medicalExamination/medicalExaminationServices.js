import db from '../../models/index';
let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let data = await db.MedicalExaminations.findOne({
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
          medicalExaminations = await db.MedicalExaminations.findAll();
        }
        if (medicalExaminationID && medicalExaminationID !== "ALL") {
          medicalExaminations = await db.MedicalExaminations.findOne({
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
        let checkMaDL = await checkExist(data.MaDL, "MaDL");
        let checkMaPK = await checkExist(data.MaPK, "MaPK");
        if (checkMaPK) {
          resolve({
            errCode: 1,
            errMessage: "MaPK is exist. Please try MaPK other",
          });
        }
        if (checkMaDL) {
          resolve({
            errCode: 1,
            errMessage: "MaDL is exist. Please try MaDL other",
          });
        }
        else {
          await db.MedicalExaminations.create({
            MaPK: data.MaPK,
            MaDL: data.MaDL,
            CaKham: data.CaKham,
            NgayKham: data.NgayKham,
            KetQua: data.KetQua,
          });
          resolve({
            errCode: 0,
            message: "Thêm phiếu khám mới thành công",
          });
        }
      } catch (e) {
        reject({
          errCode: 1,
          message: "Mã đặt lịch tồn tại",
        });
      }
    });
  },
  deleteMedicalExamination: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let medicalExamination = await db.MedicalExaminations.findOne({
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
            errCode: 1,
            errMessage: "Messing requited parameter"
          });
        }
        let medicalExamination = await db.MedicalExaminations.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (medicalExamination) {
          medicalExamination.CaKham = data.CaKham,
            medicalExamination.KetQua = data.KetQua,
            medicalExamination.NgayKham = data.NgayKham,
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
