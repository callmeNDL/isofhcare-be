import clinicServices from './clinicServices'
const clinicController = {
  handleGetAllClinics: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        clinics: [],
      });
    }
    let clinics = await clinicServices.getAllClinics(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      clinics,
    });
  },
  handleCreateNewClinic: async (req, res) => {
    let message = await clinicServices.createNewClinic(req.body);
    return res.status(200).json(message);
  },
  handleDeleteClinic: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters!',
      })
    } else {
      let message = await clinicServices.deleteClinic(req.body.id);
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
  handleUpdateClinic: async (req, res) => {
    let message = await clinicServices.updateClinic(req.body);
    return res.status(200).json(message)
  }
}

module.exports = clinicController