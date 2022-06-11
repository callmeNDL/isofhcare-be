import db from '../models/index'

let getAboutPage = async (req, res) => {
  try {
    let data = await db.User.findOne({
      where: {
        id: '1'
      },
      include: [{
        model: db.Role,
        as: "roleData"
      }]
    });
    res.status(200).json(data);

  } catch (error) {
    return (console.log("loi"))
  }
}

module.exports = {
  getAboutPage: getAboutPage
}