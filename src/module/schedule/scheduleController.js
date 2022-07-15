import scheduleServices from './scheduleServices'
const scheduleController = {
  handleGetAllSchedules: async (req, res) => {
    let id = req.query.id;
    let MaBS = req.query.MaBS;
    if (id) {
      let schedules = await scheduleServices.getAllSchedule(id);
      return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        schedules,
      });
    } else if (MaBS) {
      let schedules = await scheduleServices.getAllScheduleByMaBS(MaBS);
      return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        schedules,
      });
    } else {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        schedules: [],
      });
    }
  },
  handleGetScheduleByMaBS: async (req, res) => {
    let MaBS = req.query.id;
    if (!MaBS) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        schedules: [],
      });
    }
    let schedules = await scheduleServices.getAllScheduleByMaBS(MaBS);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      schedules,
    });
  },
  handleCreateNewSchedule: async (req, res) => {
    let message = await scheduleServices.createNewSchedule(req.body);
    return res.status(200).json(message);
  },
  handleDeleteSchedule: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Thiếu các thông số bắt buộc!',
      })
    } else {
      let message = await scheduleServices.deleteSchedule(req.body.id);
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
  handleUpdateSchedule: async (req, res) => {
    let message = await scheduleServices.updateSchedule(req.body);
    return res.status(200).json(message)
  }
}

module.exports = scheduleController