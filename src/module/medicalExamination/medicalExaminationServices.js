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
          medicalExaminations = await db.MedicalExaminations.findAll({
            include: [{
              model: db.MedicalTests,
              // as: "MedicalTest"
            }],
            raw: true,
            nest: true
          });
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
            errMessage: "Mã phiếu khám đã tồn tại",
          });
        }
        if (checkMaDL) {
          resolve({
            errCode: 1,
            errMessage: "Dặt lịch đã có phiếu khám!",
          });
        }
        else {
          let uid = Number((new Date().getTime()).toString().slice(-6));
          if (uid <= 9999) {
            uid + 10000
          }
          await db.MedicalExaminations.create({
            MaPK: uid,
            MaDL: data.MaDL,
            CaKham: data.CaKham,
            NgayKham: data.NgayKham,
            KetQua: data.KetQua,
            MaPhong: data.MaPhong,
            TenPK: data.TenPK
          }).then(() => {
            resolve({
              errCode: 0,
              errMessage: "Thêm thành công",
            });
          }).catch((err) => {
            console.log(err);
            resolve({
              errCode: 1,
              errMessage: "Thêm thất bại",
            });
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
          const medicalTest = await db.MedicalTests.findAll({
            where: { MaPK: medicalExamination.MaPK }
          });
          if (medicalTest.length !== 0) {
            resolve({
              errCode: 1,
              errMessage: `Phiếu khám có ${medicalTest.length} phiếu xét nghiệm`
            })
          } else {
            await medicalExamination.destroy();
            resolve({
              errCode: 0,
              errMessage: "Xoá thành công"
            })
          }
        }
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "Lỗi hệ thống"
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
            medicalExamination.TenPK = data.TenPK,
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
