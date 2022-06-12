'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicalExamination', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaPK: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
      },
      MaDL: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "Bookings",
          key: 'MaDL'
        }
      },
      CaKham: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TimeFrame",
          key: 'CaKham'
        }
      },
      NgayKham: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      KetQua: {
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
    await queryInterface.dropTable('MedicalExamination');
  }
};