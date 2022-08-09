'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalTests extends Model {

    static associate(models) {
      MedicalTests.belongsTo(models.MedicalExaminations, { foreignKey: 'MaPK', targetKey: 'MaPK' });
      MedicalTests.belongsTo(models.Doctor, { foreignKey: 'MaBS', targetKey: 'MaBS' });

    }
  }
  MedicalTests.init({
    MaBS: DataTypes.STRING,
    MaPK: DataTypes.STRING,
    TenPXN: DataTypes.STRING,
    KetQua: DataTypes.STRING,
    HinhAnhXN: DataTypes.STRING,
    NgayXN: DataTypes.DATE,
    TrangThai: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'MedicalTests',
  });
  return MedicalTests;
};