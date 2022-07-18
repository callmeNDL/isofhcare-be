import authServices from './authServices'

const authController = {
  handleLoginUser: async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.ChucVu;
    if (!username || !password) {
      return res.status(500).json({
        errCode: 1,
        message: "Nhập thông tin đăng nhập !",
      })
    }
    let userData = await authServices.loginUser(username, password, role);
    res.cookie("refreshToken", userData.refreshToken, {
      httpOnly: true,
      secure: false,
      path: '/',
      saneSite: "strict",
    })

    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {},
      accessToken: userData.accessToken,
    });
  },
  handleRefreshToken: async (req, res) => {
    // const refreshToken = req.cookies.refreshToken;
    // console.log(refreshToken);
    return res.status(200).json("refreshToken");
  }
}

module.exports = authController