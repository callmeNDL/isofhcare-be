'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {

    static associate(models) {
      // Doctor.belongsTo(models.Department, { foreignKey: 'MaKhoa', as: 'departmentData' });
    }
  }
  Doctor.init({
    MaBS: DataTypes.STRING,
    MaKhoa: DataTypes.STRING,
    HoTen: DataTypes.STRING,
    CMND: DataTypes.INTEGER,
    NgaySinh: DataTypes.DATE,
    GioiTinh: DataTypes.BOOLEAN,
    SDT: DataTypes.STRING,
    DiaChi: DataTypes.STRING,
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