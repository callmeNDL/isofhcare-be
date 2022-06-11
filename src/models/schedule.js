'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {

    static associate(models) {
      // Schedule.hasMany(models.User, { foreignKey: 'MaChucVu', as: 'roleData' });
    }
  }
  Schedule.init({
    MaBS: DataTypes.INTEGER,
    MaPhong: DataTypes.INTEGER,
    CaKham: DataTypes.INTEGER,
    NgayKham: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};