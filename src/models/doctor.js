'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {

    static associate(models) {
      Doctor.belongsTo(models.Department, { foreignKey: 'MaKhoa', as: 'departmentData' });
    }
  }
  Doctor.init({
    MaBS: DataTypes.INTEGER,
    MaKhoa: DataTypes.INTEGER,
    HoTen: DataTypes.STRING,
    CMND: DataTypes.INTEGER,
    NgaySinh: DataTypes.DATE,
    DiaChi: DataTypes.STRING,
    GioiTinh: DataTypes.BOOLEAN,
    SDT: DataTypes.INTEGER,
    ChuyenNganh: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    HinhAnh: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};