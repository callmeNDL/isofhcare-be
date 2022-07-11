import timetableServices from './timetableServices'
const timetableController = {
  handleGetAllTimetables: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        timetables: [],
      });
    }
    let timetables = await timetableServices.getAllTimetable(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      timetables,
    });
  },
  handleCreateNewTimetable: async (req, res) => {
    let message = await timetableServices.createNewTimetable(req.body);
    return res.status(200).json(message);
  },
  handleDeleteTimetable: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters!',
      })
    } else {
      let message = await timetableServices.deleteTimetable(req.body.id);
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
  handleUpdateTimetable: async (req, res) => {
    let message = await timetableServices.updateTimetable(req.body);
    return res.status(200).json(message)
  }
}

module.exports = timetableController