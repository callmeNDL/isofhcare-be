'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrescriptionDetail extends Model {

    static associate(models) {
      // PrescriptionDetail.hasMany(models.User, { foreignKey: 'MaChucVu', as: 'roleData' });
    }
  }
  PrescriptionDetail.init({
    MaDT: DataTypes.INTEGER,
    MaThuoc: DataTypes.INTEGER,
    LieuLuong: DataTypes.INTEGER,
    SoLuong: DataTypes.INTEGER,
    SoNgayUong: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PrescriptionDetail',
  });
  return PrescriptionDetail;
};