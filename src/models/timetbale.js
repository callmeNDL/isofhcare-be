
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Timetables extends Model {

    static associate(models) {
      Timetables.hasMany(models.Schedule, { foreignKey: 'MaBS', as: 'timeTableData' });
    }
  }
  Timetables.init({
    // MaChucVu: DataTypes.INTEGER,
    CaKham: DataTypes.INTEGER,
    ThoiGian: DataTypes.TIME,
  }, {
    sequelize,
    modelName: 'Timetables',
  });
  return Timetables;
};