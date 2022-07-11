'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaBS: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Doctors",
          key: 'MaBS'
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
      CaKham: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Timetables",
          key: 'CaKham'
        }
      },
      NgayKham: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Schedules');
  }
};