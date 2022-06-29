import roleServices from './roleServices'
const roleController = {
  handleGetAllRoles: async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Failed",
        roles: [],
      });
    }
    let roles = await roleServices.getAllRole(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      roles,
    });
  },
  handleCreateNewRole: async (req, res) => {
    let message = await roleServices.createNewRole(req.body);
    return res.status(200).json(message);
  },
  handleDeleteRole: async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing required parameters!',
      })
    } else {
      let message = await roleServices.deleteRole(req.body.id);
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
  handleUpdateRole: async (req, res) => {
    let message = await roleServices.updateRole(req.body);
    return res.status(200).json(message)
  }
}

module.exports = roleController