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
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true
      },
      MaChucVu: {
        type: Sequelize.INTEGER,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};