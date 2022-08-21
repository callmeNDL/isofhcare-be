import db from '../../models/index';

let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let value = {};
      value[filter] = variable;
      let prescription = await db.Prescription.findOne({
        where: value,
      });
      if (prescription) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const prescriptionServices = {
  getAllPrescriptions: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prescriptions = "";
        if (id === "ALL") {
          prescriptions = await db.Prescription.findAll({
            include: { model: db.User },
            raw: true,
            nest: true
          });
        }
        if (id && id !== "ALL") {
          prescriptions = await db.Prescription.findOne({
            where: { id: id },
            include: { model: db.User },
            raw: true,
            nest: true
          });
        }
        resolve(prescriptions);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewPrescription: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // check email exist
        let checkMaDT = await checkExist(data.MaDT, "MaDT");
        if (checkMaDT === true) {
          resolve({
            errCode: 1,
            errMessage: "MaDT is exist. Please try MaDT other",
          });
        }
        else {
          let uid = Number((new Date().getTime()).toString().slice(-6));
          if (uid <= 9999) {
            uid + 10000
          }
          await db.Prescription.create({
            MaDT: uid,
            MaPK: data.MaPK,
            MaBS: data.MaBS,
            MaUser: data.MaUser,
            TinhTrang: data.TinhTrang,
            LoiDanBS: data.LoiDanBS,
            NgayCap: data.NgayCap,
            TrangThai: data.TenPhongKham,
            TongTienThuoc: data.TongTienThuoc,
          });
          resolve({
            errCode: 0,
            message: "prescription create success",
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  deletePrescription: async (id) => {
    return new Promise(async (resolve, reject) => {
      //check id
      try {
        let prescription = await db.Prescription.findOne({
          where: { id: id },
          raw: false
        })
        if (!prescription) {
          resolve({
            errCode: 1,
            errMessage: "prescription is not exist"
          })
        } else {
          await prescription.destroy().then(() => {
            resolve({
              errCode: 0,
              errMessage: "Xoá thành công"
            })
          }).catch((err) => {
            console.log(err);
            resolve({
              errCode: 1,
              errMessage: "Xoá thất bại vì đơn thuốc đã có thuốc",
            });
          });
          resolve({
            errCode: 0,
            errMessage: "The prescription is delete"
          })
        }
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "prescription is not delete aa"
        })
      }
    })
  },
  updatePrescription: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 1,
            errMessage: "Messing requited parameter"
          });
        }
        let prescription = await db.Prescription.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (prescription) {
          prescription.MaBS = data.MaBS,
            prescription.MaUser = data.MaUser,
            prescription.TinhTrang = data.TinhTrang,
            prescription.LoiDanBS = data.LoiDanBS,
            prescription.NgayCap = data.NgayCap,
            prescription.TrangThai = data.TrangThai,
            prescription.TongTienThuoc = data.TongTienThuoc,
            await prescription.save();
          resolve({
            errCode: 0,
            errMessage: "Update prescription success!"
          })
        } else {
          resolve({
            errCode: 1,
            errMessage: "Prescription not found!"
          });
        }
      } catch (e) {
        reject(e);
      }
    })
  }
}

module.exports = prescriptionServices