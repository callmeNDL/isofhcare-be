'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medicines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaThuoc: {
        type: Sequelize.CHAR(20),
        allowNull: false,
        unique: true,
      },
      TenThuoc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ThanhPhan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CongDung: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      GiaBan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      DonVi: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      SoLuong: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      NgaySX: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      HanSuDung: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }, {
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Medicines');
  }
};