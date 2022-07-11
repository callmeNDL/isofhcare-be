
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreDetails extends Model {

    static associate(models) {
    }
  }
  PreDetails.init({
    MaDT: DataTypes.INTEGER,
    MaThuoc: DataTypes.INTEGER,
    LieuLuong: DataTypes.INTEGER,
    SoLuong: DataTypes.INTEGER,
    SoNgayUong: DataTypes.INTEGER,
    TongTienThuoc: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PreDetails',
  });
  return PreDetails;
};