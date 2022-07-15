'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicalExaminationDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaPK: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        references: {
          model: "MedicalExaminations",
          key: 'MaPk'
        }
      },
      MaPhong: {
        type: Sequelize.CHAR(10),
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
    await queryInterface.dropTable('MedicalExaminationDetails');
  }
};