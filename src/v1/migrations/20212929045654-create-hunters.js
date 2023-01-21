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
          allowNull: false
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: true
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: true
        },
        birthDate: {
          type: Sequelize.STRING,
          allowNull: true
        },
        phoneNumber: {
          type: Sequelize.STRING,
          allowNull: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
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
        isActive: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
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
        queryInterface.addIndex('hunters', ['nickName'], {
          unique: true
        })
      )
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
      .then(() =>
        queryInterface.addIndex('hunters', ['email'], {
          unique: true
        })
      )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('hunters')
  }
}
