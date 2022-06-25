import db from '../../models/index';
let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let department = await db.Department.findOne({
        where: abc,
      });
      if (department) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
const departmentServices = {
  getAllDepartment: async (departmentID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let departments = "";
        if (departmentID === "ALL") {
          departments = await db.Department.findAll();
        }
        if (departmentID && departmentID !== "ALL") {
          departments = await db.User.findOne({
            where: { id: departmentID },

          });
        }

        resolve(departments);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewDepartment: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let checkMaKhoa = await checkExist(data.MaKhoa, "MaKhoa");
        let checkTenKHoa = await checkExist(data.TenKhoa, "TenKhoa");

        if (checkMaKhoa === true) {
          resolve({
            errCode: 1,
            errMessage: "MaKhoa is exist. Please try MaKhoa other",
          });
        }
        if (checkTenKHoa === true) {
          resolve({
            errCode: 1,
            errMessage: "TenKhoa is exist. Please try TenKhoa other",
          });
        } else {
          await db.Department.create({
            MaKhoa: data.MaKhoa,
            TenKhoa: data.TenKhoa,
            MoTa: data.MoTa,
          });
          resolve({
            errCode: 0,
            message: "Create complete",
          });
        }
      } catch (e) {
        reject({
          errCode: 1,
          message: "Ma Khoa đã tồn tại",
        });
      }
    });
  },
  deleteDepartment: async (id) => {
    return new Promise(async (resolve, reject) => {
      //check id
      // console.log("check id ", id);
      try {
        let department = await db.Department.findOne({
          where: { id: id },
          raw: false
        })
        if (!department) {
          resolve({
            errCode: 1,
            errMessage: "department is not exist1"
          })
        } else {
          await department.destroy();
          resolve({
            errCode: 0,
            errMessage: "The department is delete"
          })
        }
      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "department is not delete"
        })
      }
    })
  }
}

module.exports = departmentServices
