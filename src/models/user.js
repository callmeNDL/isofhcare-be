'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'MaChucVu', as: 'roleData' });
      User.belongsTo(models.Role, { foreignKey: 'MaChucVu', targetKey: 'MaChucVu', });
    }
  }
  User.init({
    MaUser: DataTypes.STRING,
    MaChucVu: DataTypes.STRING,
    CMND: DataTypes.INTEGER,
    HoTen: DataTypes.STRING,
    NgaySinh: DataTypes.DATE,
    GioiTinh: DataTypes.BOOLEAN,
    SDT: DataTypes.INTEGER,
    DiaChi: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    authenticity: DataTypes.INTEGER,
    password: DataTypes.STRING,
    HinhAnh: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};