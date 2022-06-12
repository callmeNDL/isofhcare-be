'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicalExaminationDetail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaPK: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "MedicalExamination",
          key: 'MaPk'
        }
      },
      MaPhong: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Clinics",
          key: 'MaPhong'
        }
      },
    }, {
      timestamps: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MedicalExaminationDetail');
  }
};