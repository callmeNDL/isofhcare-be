import db from '../../models/index';

let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let value = {};
      value[filter] = variable;
      let clinic = await db.Clinic.findOne({
        where: value,
      });
      if (clinic) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const clinicServices = {
  getAllClinics: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let clinics = "";
        if (id === "ALL") {
          clinics = await db.Clinic.findAll();
        }
        if (id && id !== "ALL") {
          clinics = await db.Clinic.findOne({
            where: { id: id },
          });
        }
        resolve(clinics);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewClinic: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // check email exist
        let checkMaPhong = await checkExist(data.MaPhong, "MaPhong");
        let checkTenPhongKham = await checkExist(data.TenPhongKham, "TenPhongKham");
        if (checkMaPhong === true) {
          resolve({
            errCode: 1,
            errMessage: "MaPhong is exist. Please try MaPhong other",
          });
        }
        if (checkTenPhongKham === true) {
          resolve({
            errCode: 1,
            errMessage: "TenPhongKham is exist. Please try TenPhongKham other",
          });
        } else {
          await db.Clinic.create({
            MaPhong: data.MaPhong,
            MaKhoa: data.MaKhoa,
            TenPhongKham: data.TenPhongKham,
            ChucNang: data.ChucNang,
          });
          resolve({
            errCode: 0,
            message: "clinic create success",
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  deleteClinic: async (id) => {
    return new Promise(async (resolve, reject) => {
      //check id
      try {
        let clinic = await db.Clinic.findOne({
          where: { id: id },
          raw: false
        })
        if (!clinic) {
          resolve({
            errCode: 1,
            errMessage: "clinic is not exist"
          })
        } else {
          await clinic.destroy();
          resolve({
            errCode: 0,
            errMessage: "The clinic is delete"
          })
        }
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "clinic is not delete aa"
        })
      }
    })
  },
  updateClinic: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 2,
            errMessage: "Messing requited parameter"
          });
        }
        let clinic = await db.Clinic.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (clinic) {
          clinic.MaPhong = data.MaPhong,
            clinic.MaKhoa = data.MaKhoa,
            clinic.TenPhongKham = data.TenPhongKham,
            clinic.ChucNang = data.ChucNang,
            await clinic.save();
          resolve({
            errCode: 0,
            errMessage: "update clinic success!"
          })
        } else {
          resolve({
            errCode: 1,
            errMessage: "Clinic not found!"
          });
        }

      } catch (e) {
        reject(e);
      }
    })
  }

}

module.exports = clinicServices