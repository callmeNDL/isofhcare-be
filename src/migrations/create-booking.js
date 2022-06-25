'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaDL: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
      },
      MaBS: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Doctors",
          key: 'MaBS'
        }
      },
      MaUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: 'MaUser'
        }
      },
      ThoiGian: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      NgayDL: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      TinhTrangBN: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      TrangThai: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "new"
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
    await queryInterface.dropTable('Bookings');
  }
};