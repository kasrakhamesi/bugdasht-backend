'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('vulnerabilities', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        metaData: {
          type: Sequelize.JSON,
          allowNull: true
        },
        active: {
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
        queryInterface.addIndex('vulnerabilities', ['title'], { unique: true })
      )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vulnerabilities')
  }
}
