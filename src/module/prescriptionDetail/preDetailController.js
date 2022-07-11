import preDetailServices from './preDetailServices'
const preDetailController = {
  handleGetAllPreDetails: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        preDetails: [],
      });
    }
    let preDetails = await preDetailServices.getAllPreDetails(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      preDetails,
    });
  },
  handleCreateNewPreDetails: async (req, res) => {
    let message = await preDetailServices.createNewPreDetail(req.body);
    return res.status(200).json(message);
  },
  handleDeletePreDetails: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters!',
      })
    } else {
      let message = await preDetailServices.DeletePreDetail(req.body.id);
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
  handleUpdatePreDetails: async (req, res) => {
    let message = await preDetailServices.updatePreDetail(req.body);
    return res.status(200).json(message)
  }
}

module.exports = preDetailController