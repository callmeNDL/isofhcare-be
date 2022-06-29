'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalExamination extends Model {

    static associate(models) {
    }
  }
  MedicalExamination.init({
    MaPK: DataTypes.INTEGER,
    MaDL: DataTypes.INTEGER,
    ThoiGian: DataTypes.TIME,
    NgayKham: DataTypes.DATE,
    KetQua: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MedicalExamination',
  });
  return MedicalExamination;
};