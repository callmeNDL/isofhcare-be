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
    MaKhoa: DataTypes.INTEGER,
    TenKhoa: DataTypes.STRING,
    MoTa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};