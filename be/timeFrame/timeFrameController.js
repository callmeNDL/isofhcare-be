import timeFrameServices from './timeFrameServices'
const timeFrameController = {
  handleGetAllTimeFrames: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        timeFrames: [],
      });
    }
    let timeFrames = await timeFrameServices.getAllTimeFrame(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      timeFrames,
    });
  },
  handleCreateNewTimeFrame: async (req, res) => {
    let message = await timeFrameServices.createNewTimeFrame(req.body);
    return res.status(200).json(message);
  },
  handleDeleteTimeFrame: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters!',
      })
    } else {
      let message = await timeFrameServices.deleteTimeFrame(req.body.id);
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
  handleUpdateTimeFrame: async (req, res) => {
    let message = await timeFrameServices.updateTimeFrame(req.body);
    return res.status(200).json(message)
  }
}

module.exports = timeFrameController