import db from '../../models/index';

let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let value = {};
      value[filter] = variable;
      let prescriptionDetail = await db.PrescriptionDetail.findOne({
        where: value,
      });
      if (prescriptionDetail) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const prescriptionDetailServices = {
  getAllPrescriptionDetails: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prescriptionDetails = "";
        if (id === "ALL") {
          prescriptionDetails = await db.PrescriptionDetail.findAll();
        }
        if (id && id !== "ALL") {
          prescriptionDetails = await db.PrescriptionDetail.findOne({
            where: { id: id },
          });
        }
        resolve(prescriptionDetails);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewPrescriptionDetail: async (data) => {
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
          await db.PrescriptionDetail.create({
            MaDT: data.MaDT,
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
            message: "prescriptionDetail create success",
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  deletePrescriptionDetail: async (id) => {
    return new Promise(async (resolve, reject) => {
      //check id
      try {
        let prescriptionDetail = await db.PrescriptionDetail.findOne({
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
          errMessage: "prescriptionDetail is not delete aa"
        })
      }
    })
  },
  // updatePrescriptionDetail: async (data) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {

  //       if (!data.id) {
  //         resolve({
  //           errCode: 2,
  //           errMessage: "Messing requited parameter"
  //         });
  //       }
  //       let prescriptionDetail = await db.PrescriptionDetail.findOne({
  //         where: { id: data.id },
  //         raw: false,
  //       });
  //       if (prescriptionDetail) {
  //         prescriptionDetail.MaChucVu = data.MaChucVu,
  //           prescriptionDetail.HoTen = data.HoTen,
  //           prescriptionDetail.NgaySinh = data.NgaySinh,
  //           prescriptionDetail.DiaChi = data.DiaChi,
  //           prescriptionDetail.GioiTinh = data.GioiTinh,
  //           prescriptionDetail.SDT = data.SDT,
  //           prescriptionDetail.CMND = data.CMND,
  //           prescriptionDetail.email = data.email,
  //           prescriptionDetail.HinhAnh = data.HinhAnh,
  //           await prescriptionDetail.save();
  //         resolve({
  //           errCode: 0,
  //           errMessage: "update prescriptionDetail success!"
  //         })
  //       } else {
  //         resolve({
  //           errCode: 1,
  //           errMessage: "PrescriptionDetail not found!"
  //         });
  //       }

  //     } catch (e) {
  //       reject(e);
  //     }
  //   })
  // }

}

module.exports = prescriptionDetailServices