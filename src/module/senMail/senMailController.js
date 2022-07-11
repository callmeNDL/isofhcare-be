import senMailServices from './senMailServices'
const senMailController = {
  handleSenMail: async (req, res) => {
    let email = req.body.email;
    let dataSend = {
      patientName: "long",
      time: "12:00",
      doctorName: "bac si 01",
      redirectLink: "001"
    }
    if (!email) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Nhập email gửi tới",
      });
    }
    let result = await senMailServices.sendEmail(email, dataSend);
    return res.status(200).json({
      errCode: result.errCode,
      errMessage: result.errMessage,
    });
  },

}
module.exports = senMailController