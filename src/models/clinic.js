'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {

    static associate(models) {
      // Clinic.hasMany(models.User, { foreignKey: 'MaChucVu', as: 'roleData' });
    }
  }
  Clinic.init({
    MaPhong: DataTypes.INTEGER,
    MaKhoa: DataTypes.INTEGER,
    TenPhongKham: DataTypes.STRING,
    ChucNang: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};