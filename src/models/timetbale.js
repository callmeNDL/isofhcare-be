
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Timetables extends Model {

    static associate(models) {
    }
  }
  Timetables.init({
    // MaChucVu: DataTypes.INTEGER,
    CaKham: DataTypes.STRING,
    ThoiGian: DataTypes.TIME,
  }, {
    sequelize,
    modelName: 'Timetables',
  });
  return Timetables;
};