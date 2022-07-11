import db from '../../models/index';
let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let data = await db.MedicalTests.findOne({
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
const medicalTestServices = {
  getAllMedicalTest: async (medicalTestID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let medicalTests = "";
        if (medicalTestID === "ALL") {
          medicalTests = await db.MedicalTests.findAll();
        }
        if (medicalTestID && medicalTestID !== "ALL") {
          medicalTests = await db.MedicalTests.findOne({
            where: { id: medicalTestID },
          });
        }
        resolve(medicalTests);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewMedicalTest: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.MedicalTests.create({
          MaBS: data.MaBS,
          MaPK: data.MaPK,
          TenPXN: data.TenPXN,
          KetQua: data.KetQua,
          NgayXN: data.NgayXN,
          TrangThai: data.TrangThai,
        });
        resolve({
          errCode: 0,
          message: "Thêm phiếu xét nghiệm mới thành công",
        });
        console.log(data);
      } catch (e) {
        reject({
          errCode: 1,
          message: "Phiếu XN tồn tại tồn tại",
        });
      }
    });
  },
  deleteMedicalTest: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let medicalTest = await db.MedicalTests.findOne({
          where: { id: id },
          raw: false
        })
        if (!medicalTest) {
          resolve({
            errCode: 1,
            errMessage: "MedicalTest is not exist"
          })
        } else {
          await medicalTest.destroy();
          resolve({
            errCode: 0,
            errMessage: "The medicalTest is delete"
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
  updateMedicalTest: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 1,
            errMessage: "Messing requited parameter"
          });
        }
        let medicalTest = await db.MedicalTests.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (medicalTest) {
          medicalTest.MaBS = data.MaBS,
            medicalTest.MaPK = data.MaPK,
            medicalTest.TenPXN = data.TenPXN,
            medicalTest.KetQua = data.KetQua,
            medicalTest.NgayXN = data.NgayXN,
            medicalTest.TrangThai = data.TrangThai,
            await medicalTest.save();
          resolve({
            errCode: 0,
            errMessage: "update medicalTest success!"
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

module.exports = medicalTestServices
