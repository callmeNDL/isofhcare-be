import authServices from './authServices'

const authController = {
  handleLoginUser: async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
      return res.status(500).json({
        errCode: 1,
        message: "Please enter username and password !",
      })
    }
    let userData = await authServices.loginUser(username, password);

    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {},
      accessToken: userData.accessToken
    });
  }
}

module.exports = authController