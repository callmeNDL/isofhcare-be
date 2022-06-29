import userServices from './userServices'
const userController = {
  handleGetAllUsers: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        users: [],
      });
    }
    let users = await userServices.getAllUsers(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      users,
    });
  },
  handleCreateNewUser: async (req, res) => {
    let message = await userServices.createNewUser(req.body);
    return res.status(200).json(message);
  },
  handleDeleteUser: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters!',
      })
    } else {
      let message = await userServices.deleteUser(req.body.id);
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
  handleUpdateUser: async (req, res) => {
    let message = await userServices.updateUser(req.body);
    return res.status(200).json(message)
  }
}

module.exports = userController