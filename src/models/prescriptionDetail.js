
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreDetails extends Model {

    static associate(models) {
      PreDetails.belongsTo(models.Medicine, { foreignKey: 'MaThuoc', targetKey: 'MaThuoc', });
    }
  }
  PreDetails.init({
    MaDT: DataTypes.INTEGER,
    MaThuoc: DataTypes.STRING,
    LieuLuong: DataTypes.STRING,
    SoLuong: DataTypes.INTEGER,
    SoNgayUong: DataTypes.INTEGER,
    TongTienThuoc: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PreDetails',
  });
  return PreDetails;
};