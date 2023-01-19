'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('organizations_projects', {
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
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      },
      isVip: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      lowPrice: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      },
      midPrice: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      },
      highPrice: {
        type: Sequelize.BIGINT.UNSIGNED,
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
      adminId: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: 'admins', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(
          'pending',
          'canceled',
          'approved',
          'payment_pending',
          'end_of_budget'
        ),
        defaultValue: 'pending',
        allowNull: false
      },
      canceledReason: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paymentAmount: {
        type: Sequelize.BIGINT.UNSIGNED,
        defaultValue: null,
        allowNull: null
      },
      hasPayment: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
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
    await queryInterface.dropTable('organizations_projects')
  }
}
