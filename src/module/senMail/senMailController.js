import senMailServices from './senMailServices'
const senMailController = {
  handleSenMail: async (email, dataSend) => {
    if (!email || !dataSend) {
      return {
        errCode: 1,
        errMessage: "Điền thông tin gửi mail",
      };
    }
    let result = await senMailServices.sendEmail(email, dataSend);
    return {
      errCode: result.errCode,
      errMessage: result.errMessage,
    };
  },

}
module.exports = senMailController