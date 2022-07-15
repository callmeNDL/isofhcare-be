'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {

    static associate(models) {
      Department.hasMany(models.Doctor, { foreignKey: 'MaKhoa', as: 'departmentData' });
    }
  }
  Department.init({
    MaKhoa: DataTypes.STRING,
    TenKhoa: DataTypes.STRING,
    MoTa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};