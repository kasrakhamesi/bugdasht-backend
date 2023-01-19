'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('hunters', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT.UNSIGNED
        },
        profileImage: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        nationalCode: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: true
        },
        nickName: {
          type: Sequelize.STRING,
          allowNull: true
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        birthDate: {
          type: Sequelize.STRING,
          allowNull: false
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        shebaNumber: {
          type: Sequelize.STRING,
          allowNull: true
        },
        twitter: {
          type: Sequelize.STRING,
          allowNull: true
        },
        linkedin: {
          type: Sequelize.STRING,
          allowNull: true
        },
        bugCrowd: {
          type: Sequelize.STRING,
          allowNull: true
        },
        hackerOne: {
          type: Sequelize.STRING,
          allowNull: true
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
        },
        balance: {
          type: Sequelize.BIGINT.UNSIGNED,
          defaultValue: 0,
          allowNull: false
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }
      })
      .then(() =>
        queryInterface.addIndex('hunters', ['phoneNumber'], {
          unique: true
        })
      )
      .then(() =>
        queryInterface.addIndex('hunters', ['nationalCode'], {
          unique: true
        })
      )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('hunters')
  }
}
