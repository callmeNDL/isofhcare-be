import medicalExaminationServices from './medicalExaminationServices'
const medicalExaminationController = {
  handleGetAllMedicalExaminations: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        medicalExaminations: [],
      });
    }
    let medicalExaminations = await medicalExaminationServices.getAllMedicalExamination(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      medicalExaminations,
    });
  },
  handleCreateNewMedicalExamination: async (req, res) => {
    let message = await medicalExaminationServices.createNewMedicalExamination(req.body);
    return res.status(200).json(message);
  },
  handleDeleteMedicalExamination: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Thiếu các thông số bắt buộc!',
      })
    } else {
      let message = await medicalExaminationServices.deleteMedicalExamination(req.body.id);
      return res.status(200).json(message);
    }
  },
  handleUpdateMedicalExamination: async (req, res) => {
    let message = await medicalExaminationServices.updateMedicalExamination(req.body);
    return res.status(200).json(message)
  }
}

module.exports = medicalExaminationController