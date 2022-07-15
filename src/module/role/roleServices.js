import db from '../../models/index';
let checkExist = (variable, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let abc = {};
      abc[filter] = variable;
      let data = await db.Role.findOne({
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
const roleServices = {
  getAllRole: async (roleID) => {
    return new Promise(async (resolve, reject) => {
      try {
        let roles = "";
        if (roleID === "ALL") {
          roles = await db.Role.findAll({
            include: [{
              model: db.User,
            }],
            raw: true,
            nest: true
          });

        }
        if (roleID && roleID !== "ALL") {
          roles = await db.Role.findOne({
            where: { id: roleID },
            include: [{
              model: db.User,
            }],
            raw: true,
            nest: true
          });
        }

        resolve(roles);
      } catch (e) {
        reject(e);
      }
    });
  },
  createNewRole: (data) => {
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
          await db.Role.create({
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
  deleteRole: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        let role = await db.Role.findOne({
          where: { id: id },
          raw: false
        })
        if (!role) {
          resolve({
            errCode: 1,
            errMessage: "Role is not exist"
          })
        } else {
          let user = await db.User.findAll({
            where: { MaChucVu: role.MaChucVu },
            raw: false
          })
          if (user.length != 0) {
            resolve({
              errCode: 1,
              errMessage: `Role ${role.TenChucVu} has an user`
            })
          } else {
            await role.destroy();
            resolve({
              errCode: 0,
              errMessage: "The role is delete"
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
  updateRole: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        if (!data.id) {
          resolve({
            errCode: 2,
            errMessage: "Messing requited parameter"
          });
        }
        let role = await db.Role.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (role) {
          role.MaChucVu = data.MaChucVu,
            role.TenChucVu = data.TenChucVu,
            await role.save();
          resolve({
            errCode: 0,
            errMessage: "update role success!"
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

module.exports = roleServices
