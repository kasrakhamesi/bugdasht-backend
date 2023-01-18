'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('organization_projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      organizationId: {
        type: Sequelize.BIGINT.UNSIGNED,
        references: { model: 'organizations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      budget: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isVip: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      lowPrice: {
        type: Sequelize.STRING,
        allowNull: false
      },
      midPrice: {
        type: Sequelize.STRING,
        allowNull: false
      },
      highPrice: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT('long'),
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('organization_projects')
  }
}
