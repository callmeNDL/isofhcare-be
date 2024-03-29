'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicalExaminations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaPK: {
        allowNull: false,
        type: Sequelize.CHAR(10),
        unique: true,
      },
      MaDL: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        references: {
          model: "Bookings",
          key: 'MaDL'
        }
      },
      CaKham: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        references: {
          model: "Timetables",
          key: 'CaKham'
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
      ThoiGianKham: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      TenPK: {
        type: Sequelize.STRING(20),
        allowNull: false,
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
    await queryInterface.dropTable('MedicalExaminations');
  }
};