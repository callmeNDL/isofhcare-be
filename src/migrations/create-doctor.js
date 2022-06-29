'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Doctors', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaBS: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      MaKhoa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Departments",
          key: 'MaKhoa'
        }
      },
      HoTen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CMND: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      NgaySinh: {
        type: Sequelize.DATE
      },
      GioiTinh: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      SDT: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      ChuyenNganh: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DiaChi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      HinhAnh: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Doctors');
  }
};