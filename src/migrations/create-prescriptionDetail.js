'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PrescriptionDetail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaDT: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Prescriptions",
          key: 'MaDT'
        }
      },
      MaThuoc: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Medicines",
          key: 'MaThuoc'
        }
      },
      LieuLuong: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      SoLuong: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      SoNgayUong: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('PrescriptionDetail');
  }
};