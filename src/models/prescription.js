'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {

    static associate(models) {
      // Prescription.hasMany(models.User, { foreignKey: 'MaChucVu', as: 'roleData' });
    }
  }
  Prescription.init({
    MaDT: DataTypes.INTEGER,
    MaBS: DataTypes.STRING,
    MaUser: DataTypes.STRING,
    TinhTrang: DataTypes.STRING,
    LoiDanBS: DataTypes.STRING,
    NgayCap: DataTypes.DATE,
    TrangThai: DataTypes.STRING,
    TongTienThuoc: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Prescription',
  });
  return Prescription;
};