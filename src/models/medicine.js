'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {

    static associate(models) {
      // Medicine.hasMany(models.User, { foreignKey: 'MaChucVu', as: 'roleData' });
    }
  }
  Medicine.init({
    MaThuoc: DataTypes.INTEGER,
    TenThuoc: DataTypes.STRING,
    ThanhPhan: DataTypes.STRING,
    CongDung: DataTypes.STRING,
    GiaBan: DataTypes.INTEGER,
    DonVi: DataTypes.STRING,
    NgaySX: DataTypes.DATE,
    HanSuDung: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};