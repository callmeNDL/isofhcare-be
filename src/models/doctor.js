'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {

    static associate(models) {
      Doctor.belongsTo(models.Role, { foreignKey: 'MaChucVu', as: 'roleData' });
    }
  }
  Doctor.init({
    // MaUser: DataTypes.INTEGER,
    MaChucVu: DataTypes.INTEGER,
    CMND: DataTypes.INTEGER,
    HoTen: DataTypes.STRING,
    NgaySinh: DataTypes.DATE,
    GioiTinh: DataTypes.BOOLEAN,
    SDT: DataTypes.INTEGER,
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