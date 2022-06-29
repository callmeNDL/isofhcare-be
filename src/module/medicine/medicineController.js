import medicineServices from './medicineServices'
const medicineController = {
  handleGetAllMedicines: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        medicines: [],
      });
    }
    let medicines = await medicineServices.getAllMedicines(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      medicines,
    });
  },
  handleCreateNewMedicine: async (req, res) => {
    let message = await medicineServices.createNewMedicine(req.body);
    return res.status(200).json(message);
  },
  handleDeleteMedicine: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters!',
      })
    } else {
      let message = await medicineServices.deleteMedicine(req.body.id);
      if (message.errCode === 1) {
        return res.status(200).json({
          errCode: 1,
          errMessage: "Medicine is not delete"
        });
      } else {
        return res.status(200).json(message);
      }
    }
  },
  handleUpdateMedicine: async (req, res) => {
    let message = await medicineServices.updateMedicine(req.body);
    return res.status(200).json(message)
  }
}

module.exports = medicineController