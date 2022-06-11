'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeFrame extends Model {

    static associate(models) {
      // TimeFrame.hasMany(models.User, { foreignKey: 'MaChucVu', as: 'roleData' });
    }
  }
  TimeFrame.init({
    CaKham: DataTypes.INTEGER,
    ThoiGian: DataTypes.TIME,
  }, {
    sequelize,
    modelName: 'TimeFrame',
  });
  return TimeFrame;
};