'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalExamination extends Model {

    static associate(models) {
      // MedicalExamination.hasMany(models.User, { foreignKey: 'MaChucVu', as: 'roleData' });
    }
  }
  MedicalExamination.init({
    MaPK: DataTypes.INTEGER,
    MaDL: DataTypes.INTEGER,
    CaKham: DataTypes.INTEGER,
    NgayKham: DataTypes.DATE,
    KetQua: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MedicalExamination',
  });
  return MedicalExamination;
};