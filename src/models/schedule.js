'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {

    static associate(models) {
    }
  }
  Schedule.init({
    MaBS: DataTypes.STRING,
    MaPhong: DataTypes.STRING,
    CaKham: DataTypes.STRING,
    NgayKham: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};