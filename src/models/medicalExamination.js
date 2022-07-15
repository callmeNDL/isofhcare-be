'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalExaminations extends Model {

    static associate(models) {
    }
  }
  MedicalExaminations.init({
    MaPK: DataTypes.STRING,
    MaDL: DataTypes.STRING,
    CaKham: DataTypes.STRING,
    NgayKham: DataTypes.DATE,
    KetQua: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MedicalExaminations',
  });
  return MedicalExaminations;
};