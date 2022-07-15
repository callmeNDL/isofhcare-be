import medicalTestServices from './medicalTestServices'
const medicalTestController = {
  handleGetAllMedicalTests: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        medicalTests: [],
      });
    }
    let medicalTests = await medicalTestServices.getAllMedicalTest(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      medicalTests,
    });
  },
  handleCreateNewMedicalTest: async (req, res) => {
    let message = await medicalTestServices.createNewMedicalTest(req.body);
    return res.status(200).json(message);
  },
  handleDeleteMedicalTest: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Thiếu các thông số bắt buộc!',
      })
    } else {
      let message = await medicalTestServices.deleteMedicalTest(req.body.id);
      if (message.errCode == 1) {
        return res.status(200).json({
          errCode: 1,
          errMessage: message.errMessage
        });
      } else {
        return res.status(200).json(message);
      }
    }
  },
  handleUpdateMedicalTest: async (req, res) => {
    let message = await medicalTestServices.updateMedicalTest(req.body);
    return res.status(200).json(message)
  }
}

module.exports = medicalTestController