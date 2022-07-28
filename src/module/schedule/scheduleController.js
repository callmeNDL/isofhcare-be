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
  handleGetAllSchedulesWithDate: async (req, res) => {
    let NgayKham = req.query.NgayKham;
    let MaBS = req.query.MaBS;
    if (MaBS && NgayKham) {
      let schedules = await scheduleServices.getAllScheduleBS(MaBS, NgayKham);
      return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        schedules,
      });
    }
    return res.status(200).json({
      errCode: 1,
      errMessage: "Nhạp Ngày và mã bác sĩ",
      schedules: [],
    });
  },
  handleCreateNewSchedule: async (req, res) => {
    let message = await scheduleServices.createNewSchedule(req.body);
    return res.status(200).json(message);
  },
  handleDeleteSchedule: async (req, res) => {
    if (!req.query.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Thiếu các thông số bắt buộc!',
      })
    } else {
      let message = await scheduleServices.deleteSchedule(req.query.id);
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