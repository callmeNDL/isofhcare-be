'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalExaminations extends Model {

    static associate(models) {
      MedicalExaminations.hasMany(models.MedicalTests, { foreignKey: 'MaPK', targetKey: 'MaPK' });
    }
  }
  MedicalExaminations.init({
    MaPK: DataTypes.STRING,
    MaDL: DataTypes.STRING,
    CaKham: DataTypes.STRING,
    NgayKham: DataTypes.DATE,
    KetQua: DataTypes.STRING,
    MaPhong: DataTypes.STRING,
    TenPK: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MedicalExaminations',
  });
  return MedicalExaminations;
};