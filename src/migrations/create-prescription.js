'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prescriptions', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MaDT: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
      },
      MaBS: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "Doctors",
          key: 'MaBS'
        }
      },
      MaUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "Users",
          key: 'MaUser'
        }
      },
      TinhTrang: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      LoiDanBS: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      NgayCap: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      TongTienThuoc: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable('Prescriptions');
  }
};