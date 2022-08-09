import doctorServices from './doctorServices'
const doctorController = {
  handleGetAllDoctors: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        doctors: [],
      });
    }
    let doctors = await doctorServices.getAllDoctors(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      doctors,
    });
  },
  handleSearch: async (req, res) => {
    let textSearch = req.query.textSearch;
    if (!textSearch) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        doctors: [],
      });
    }
    let result = await doctorServices.searchDoctor(textSearch);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      doctors: result,
    });
  },
  handlePagination: async (req, res) => {
    let page = req.query.page;
    if (!page) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing param",
        doctors: [],
      });
    }
    let result = await doctorServices.Pagination(page);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      doctors: result,
    });
  },
  handleCheckExistDoctor: async (req, res) => {
    let message = await doctorServices.checkExistDoctor(req.body);
    return res.status(200).json(message);
  },
  handleCreateNewDoctor: async (req, res) => {
    let message = await doctorServices.createNewDoctor(req.body);
    return res.status(200).json(message);
  },
  handleDeleteDoctor: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Thiếu các thông số bắt buộc!',
      })
    } else {
      let message = await doctorServices.deleteDoctor(req.body.id);
      if (message.errCode === 1) {
        return res.status(200).json({
          errCode: 1,
          errMessage: message.errMessage
        });
      } else {
        return res.status(200).json(message);
      }
    }
  },
  handleUpdateDoctor: async (req, res) => {
    let message = await doctorServices.updateDoctor(req.body);
    return res.status(200).json(message)
  }
}

module.exports = doctorController