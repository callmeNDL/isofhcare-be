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
      HoTen: {
        type: Sequelize.STRING(50),
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
        type: Sequelize.CHAR(10),
        allowNull: false,
        unique: true
      },
      ChuyenNganh: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      DiaChi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.CHAR(30),
        allowNull: false,
      },
      HinhAnh: {
        type: Sequelize.STRING,
        defaultValue: "https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-580x440.png",
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