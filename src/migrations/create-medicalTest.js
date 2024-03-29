'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicalTests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaBS: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        references: {
          model: "Doctors",
          key: 'MaBS'
        }
      },
      MaPK: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        references: {
          model: "MedicalExaminations",
          key: 'MaPK'
        }
      },
      TenPXN: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      KetQua: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      HinhAnhXN: {
        type: Sequelize.STRING,
      },
      NgayXN: {
        type: Sequelize.DATE
      },
      TrangThai: {
        type: Sequelize.CHAR(20),
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
    await queryInterface.dropTable('MedicalTests');
  }
};