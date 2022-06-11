import db from '../models/index'

let getAboutPage = async (req, res) => {
  try {
    let user = await db.User.findOne({
      where: {
        id: '1'
      },
      include: [{
        model: db.Role,
        as: "roleData"
      }]
    });
    let users = await db.User.findAll({
      include: [{
        model: db.Role,
        as: "roleData"
      }]
    });
    let doctor = await db.Doctor.findOne({
      where: {
        id: '1'
      },
      include: [{
        model: db.Department,
        as: "departmentData"
      }]
    });
    let doctors = await db.Doctor.findAll({

      include: [{
        model: db.Department,
        as: "departmentData"
      }]
    });
    res.status(200).json(doctors);

  } catch (error) {
    return (console.log("loi"))
  }
}

module.exports = {
  getAboutPage: getAboutPage
}