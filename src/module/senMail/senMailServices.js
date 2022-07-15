import nodemailer from 'nodemailer';
let getBodyHTMLEmail = (dataSend) => {
  let result = '';
  if (dataSend.length !== 0) {
    result = `<h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div style="margin:30px 0;display:flex;width:100%;justify-content: center;">
    <img height="77" src="https://ci5.googleusercontent.com/proxy/J2qOvYC5kqiqo8yu1R-kkCfxNRVRIBUdeaEtwmU7tQ4Pn0UPJ6sxuyQKnt9rPWdPulwGu9nU2QFCoanlRC2p5c1M3M45CCJbGyM_yMNpgeoy4bN2eAbKXTi2D4EjMt4=s0-d-e1-ft#https://cdn.discordapp.com/email_assets/b8b45946cdb48e362c48e0d7dc704f23.png" style="border:0;display:block;outline:none;text-decoration:none;height:77;font-size:13px" width="160" class="CToWUd">
    </div>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
    <div>Xin chân thành cảm ơn!</div>
    <div style="font-size:0.8em;text-align:center;color:#999999"> Isofhcare, 180 Đ. Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh </div>
  `;
  }

  return result;
};
const senMailServices = {
  sendEmail: async (email, dataSend) => {
    return new Promise(async (resolve, reject) => {
      try {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,// true for 465, false for other ports
          auth: {
            user: "long.ndl0432@gmail.com", // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
          },
        });
        // send mail with defined transport object

        await transporter.sendMail({
          from: '"Đây là mail của long 👻" <foo@example.com>', // sender address
          to: `${email}`, // list of receivers
          subject: 'Thông tin đặt lịch khám bệnh.', // Subject line
          text: getBodyHTMLEmail(dataSend), // plain text body
          html: getBodyHTMLEmail(dataSend), // html body
        }, (err) => {
          if (err) {
            console.log(err);
            resolve({
              errCode: 1,
              errMessage: "Lỗi send mail",
            })
          }
          resolve({
            errCode: 0,
            errMessage: "send done",
          })
        });

      } catch (e) {
        reject({
          errCode: 1,
          errMessage: "Lỗi server"
        })
      }
    })
  }
}

module.exports = senMailServices
