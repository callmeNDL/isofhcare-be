import prescriptionDetailServices from './prescriptionDetailServices'
const prescriptionDetailController = {
  handleGetAllPrescriptionDetails: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        prescriptionDetails: [],
      });
    }
    let prescriptionDetails = await prescriptionDetailServices.getAllPrescriptionDetails(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      prescriptionDetails,
    });
  },
  handleCreateNewPrescriptionDetail: async (req, res) => {
    let message = await prescriptionDetailServices.createNewPrescriptionDetail(req.body);
    return res.status(200).json(message);
  },
  handleDeletePrescriptionDetail: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters!',
      })
    } else {
      let message = await prescriptionDetailServices.deletePrescriptionDetail(req.body.id);
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
  // handleUpdatePrescriptionDetail: async (req, res) => {
  //   let message = await prescriptionDetailServices.updatePrescriptionDetail(req.body);
  //   return res.status(200).json(message)
  // }
}

module.exports = prescriptionDetailController