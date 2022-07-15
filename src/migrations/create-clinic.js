'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clinics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaPhong: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        unique: true,
      },
      MaKhoa: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        references: {
          model: "Departments",
          key: 'MaKhoa'
        }
      },
      TenPhongKham: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ChucNang: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Clinics');
  }
};