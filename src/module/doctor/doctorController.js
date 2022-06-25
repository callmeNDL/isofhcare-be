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
  handleCreateNewDoctor: async (req, res) => {
    let message = await doctorServices.createNewDoctor(req.body);
    return res.status(200).json(message);
  },
  handleDeleteDoctor: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters!',
      })
    } else {
      let message = await doctorServices.deleteDoctor(req.body.id);
      return res.status(200).json(message);
    }
  },
}

module.exports = doctorController