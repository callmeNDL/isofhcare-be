'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalTests extends Model {

    static associate(models) {
    }
  }
  MedicalTests.init({
    MaBS: DataTypes.INTEGER,
    MaPK: DataTypes.INTEGER,
    TenPXN: DataTypes.STRING,
    KetQua: DataTypes.STRING,
    NgayXN: DataTypes.DATE,
    TrangThai: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'MedicalTests',
  });
  return MedicalTests;
};