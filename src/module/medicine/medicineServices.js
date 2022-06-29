import db from '../../models/index';

let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let medicine = await db.Medicine.findOne({
        where: abc,
      });
      if (medicine) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const medicineServices = {
  getAllMedicines: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let medicines = "";
        if (id === "ALL") {
          medicines = await db.Medicine.findAll();
        }
        if (id && id !== "ALL") {
          medicines = await db.Medicine.findOne({
            where: { id: id },
          });
        }
        resolve(medicines);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewMedicine: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // check email exist
        let checkMaThuoc = await checkExist(data.MaThuoc, "MaThuoc");
        let checkTenThuoc = await checkExist(data.TenThuoc, "TenThuoc");
        if (checkMaThuoc === true) {
          resolve({
            errCode: 1,
            errMessage: "MaThuoc is exist. Please try MaThuoc other",
          });
        }
        if (checkTenThuoc === true) {
          resolve({
            errCode: 1,
            errMessage: "TenThuoc is exist. Please try TenThuoc other",
          });
        } else {
          await db.Medicine.create({
            MaThuoc: data.MaThuoc,
            TenThuoc: data.TenThuoc,
            ThanhPhan: data.ThanhPhan,
            CongDung: data.CongDung,
            GiaBan: data.GiaBan,
            DonVi: data.DonVi,
            NgaySX: data.NgaySX,
            HanSuDung: data.HanSuDung,
          });
          resolve({
            errCode: 0,
            message: "OK",
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  deleteMedicine: async (id) => {
    return new Promise(async (resolve, reject) => {
      //check id
      try {
        let medicine = await db.Medicine.findOne({
          where: { id: id },
          raw: false
        })
        if (!medicine) {
          resolve({
            errCode: 1,
            errMessage: "medicine is not exist"
          })
        } else {
          await medicine.destroy();
          resolve({
            errCode: 0,
            errMessage: "The medicine is delete"
          })
        }
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "medicine is not delete"
        })
      }
    })
  },
  updateMedicine: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 2,
            errMessage: "Messing requited parameter"
          });
        }
        let medicine = await db.Medicine.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (medicine) {
          medicine.MaThuoc = data.MaThuoc,
            medicine.TenThuoc = data.TenThuoc,
            medicine.ThanhPhan = data.ThanhPhan,
            medicine.CongDung = data.CongDung,
            medicine.GiaBan = data.GiaBan,
            medicine.DonVi = data.DonVi,
            medicine.NgaySX = data.NgaySX,
            medicine.HanSuDung = data.HanSuDung,
            await medicine.save();
          resolve({
            errCode: 0,
            errMessage: "update medicine success!"
          })
        } else {
          resolve({
            errCode: 1,
            errMessage: "Medicine not found!"
          });
        }

      } catch (e) {
        reject(e);
      }
    })
  }

}

module.exports = medicineServices