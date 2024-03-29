import departmentServices from './departmentServices'
const departmentController = {
  handleGetAllDepartments: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        departments: [],
      });
    }
    let departments = await departmentServices.getAllDepartment(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      departments,
    });
  },
  handleGetAllDoctor: async (req, res) => {
    let MaKhoa = req.query.MaKhoa;
    if (!MaKhoa) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing MaKhoa",
        doctors: [],
      });
    }
    let doctors = await departmentServices.getDoctor(MaKhoa);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      doctors,
    });
  },
  handleCreateNewDepartment: async (req, res) => {
    let message = await departmentServices.createNewDepartment(req.body);
    return res.status(200).json(message);
  },
  handleDeleteDepartment: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Thiếu các thông số bắt buộc!',
      })
    } else {
      let message = await departmentServices.deleteDepartment(req.body.id);
      if (message.errCode === 1) {
        return res.status(200).json({
          errCode: 1,
          errMessage: "department is not delete"
        });
      }
      // console.log(message);
      return res.status(200).json(message);
    }
  },
  handleUpdateDepartment: async (req, res) => {
    let message = await departmentServices.updateDepartment(req.body);
    return res.status(200).json(message)
  }
}

module.exports = departmentController