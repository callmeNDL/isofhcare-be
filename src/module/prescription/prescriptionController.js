import prescriptionServices from './prescriptionServices'
const prescriptionController = {
  handleGetAllPrescriptions: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        prescriptions: [],
      });
    }
    let prescriptions = await prescriptionServices.getAllPrescriptions(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      prescriptions,
    });
  },
  handleCreateNewPrescription: async (req, res) => {
    let message = await prescriptionServices.createNewPrescription(req.body);
    return res.status(200).json(message);
  },
  handleDeletePrescription: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters!',
      })
    } else {
      let message = await prescriptionServices.deletePrescription(req.body.id);
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
  handleUpdatePrescription: async (req, res) => {
    let message = await prescriptionServices.updatePrescription(req.body);
    return res.status(200).json(message)
  }
}

module.exports = prescriptionController