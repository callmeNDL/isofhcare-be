'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, { foreignKey: 'MaChucVu', targetKey: 'MaChucVu', });
    }
  }
  Role.init({
    MaChucVu: DataTypes.STRING,
    TenChucVu: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};