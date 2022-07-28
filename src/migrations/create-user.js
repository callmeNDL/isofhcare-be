'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaUser: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        unique: true
      },
      MaChucVu: {
        type: Sequelize.CHAR(10),
        allowNull: false,
        references: {
          model: "Roles",
          key: 'MaChucVu'
        }
      },
      CMND: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      HoTen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      NgaySinh: {
        type: Sequelize.DATE,
        allowNull: false,
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
      DiaChi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.CHAR(30),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.CHAR(30),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authenticity: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};