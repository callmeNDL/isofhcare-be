'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'MaUser', targetKey: 'MaUser', });
      Booking.belongsTo(models.Doctor, { foreignKey: 'MaBS', targetKey: 'MaBS', });
      Booking.belongsTo(models.MedicalExaminations, { foreignKey: 'MaDL', targetKey: 'MaDL', });
    }
  }
  Booking.init({
    MaDL: DataTypes.STRING,
    MaUser: DataTypes.STRING,
    MaBS: DataTypes.STRING,
    CaKham: DataTypes.STRING,
    ThoiGian: DataTypes.TIME,
    NgayDL: DataTypes.DATE,
    TinhTrangBN: DataTypes.STRING,
    TrangThai: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};