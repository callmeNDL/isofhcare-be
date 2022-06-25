'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'MaUser', as: 'userData' });
      Booking.belongsTo(models.Doctor, { foreignKey: 'MaBS', as: 'doctorData' });
    }
  }
  Booking.init({
    MaDL: DataTypes.INTEGER,
    MaUser: DataTypes.INTEGER,
    MaBS: DataTypes.INTEGER,
    ThoiGian: DataTypes.TIME,
    NgayDL: DataTypes.DATE,
    TinhTrangBN: DataTypes.STRING,
    TrangThai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};