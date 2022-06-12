'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'MaChucVu', as: 'roleData' });
      User.belongsTo(models.Booking, { foreignKey: 'MaUser', as: 'userData' });
    }
  }
  User.init({
    MaUser: DataTypes.STRING,
    MaChucVu: DataTypes.INTEGER,
    CMND: DataTypes.INTEGER,
    HoTen: DataTypes.STRING,
    NgaySinh: DataTypes.DATE,
    DiaChi: DataTypes.STRING,
    GioiTinh: DataTypes.BOOLEAN,
    SDT: DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    HinhAnh: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};