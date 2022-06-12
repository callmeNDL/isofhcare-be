'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
      Booking.hasMany(models.User, { foreignKey: 'MaUser', as: 'userData' });
    }
  }
  Booking.init({
    MaDL: DataTypes.INTEGER,
    MaUser: DataTypes.INTEGER,
    MaBs: DataTypes.INTEGER,
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