import db from '../../models/index';


const preDetails = {
  getAllPreDetails: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prescriptionDetails = "";
        if (id === "ALL") {
          prescriptionDetails = await db.PreDetails.findAll();
        }
        if (id && id !== "ALL") {
          prescriptionDetails = await db.PreDetails.findOne({
            where: { id: id },
          });
        }
        resolve(prescriptionDetails);
      } catch (e) {
        reject(e);
      }
    });
  },
  getPresDetails: async (MaDT) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prescriptionDetails = [];
        prescriptionDetails = await db.PreDetails.findAll({
          where: { MaDT: MaDT },
          include: { model: db.Medicine },
          raw: true,
          nest: true
        });
        resolve({
          errCode: 0,
          errMessage: `Danh sách chi tiết đơn thuốc ${MaDT}`,
          prescriptionDetails
        });
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "Lỗi server",
        });
      }
    });
  },
  createNewPreDetail: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.length === 0) {
          resolve({
            errCode: 1,
            errMessage: "Empty Input",
          });
        }
        else {
          let medicine = await db.Medicine.findOne({
            where: { MaThuoc: data.MaThuoc },
            raw: false
          })
          let tienthuoc = medicine.GiaBan / medicine.SoLuong * data.SoLuong;
          await db.PreDetails.create({
            MaDT: data.MaDT,
            MaThuoc: data.MaThuoc,
            LieuLuong: data.LieuLuong,
            SoLuong: data.SoLuong,
            SoNgayUong: data.SoNgayUong,
            TongTienThuoc: tienthuoc,
          });
          resolve({
            errCode: 0,
            message: "prescriptionDetail create success",
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  DeletePreDetail: async (id) => {
    return new Promise(async (resolve, reject) => {
      //check id
      try {
        let prescriptionDetail = await db.PreDetails.findOne({
          where: { id: id },
          raw: false
        })
        if (!prescriptionDetail) {
          resolve({
            errCode: 1,
            errMessage: "prescriptionDetail is not exist"
          })
        } else {
          await prescriptionDetail.destroy();
          resolve({
            errCode: 0,
            errMessage: "The prescriptionDetail is delete"
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
  updatePreDetail: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.id) {
          resolve({
            errCode: 1,
            errMessage: "Messing requited parameter"
          });
        }
        let prescriptionDetail = await db.PreDetails.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (prescriptionDetail) {
          let medicine = await db.Medicine.findOne({
            where: { MaThuoc: data.MaThuoc },
            raw: false
          })
          let tienthuoc = medicine.GiaBan * data.LieuLuong * data.SoLuong * data.SoNgayUong;
          // prescriptionDetail.MaDT = data.MaDT,
          // prescriptionDetail.MaThuoc = data.MaThuoc,
          prescriptionDetail.LieuLuong = data.LieuLuong,
            prescriptionDetail.SoLuong = data.SoLuong,
            prescriptionDetail.SoNgayUong = data.SoNgayUong,
            prescriptionDetail.TongTienThuoc = tienthuoc,
            await prescriptionDetail.save();
          resolve({
            errCode: 0,
            errMessage: "Update prescriptionDetail success!"
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

module.exports = preDetails