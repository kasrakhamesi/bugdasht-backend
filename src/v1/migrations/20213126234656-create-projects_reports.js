'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects_reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      bugTitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hunterId: {
        type: Sequelize.BIGINT.UNSIGNED,
        references: { model: 'hunters', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      organizationId: {
        type: Sequelize.BIGINT.UNSIGNED,
        references: { model: 'organizations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      organizationsProjectId: {
        type: Sequelize.BIGINT.UNSIGNED,
        references: { model: 'organizations_projects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      domainOrIp: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cvss: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cve: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vector: {
        type: Sequelize.STRING,
        allowNull: false
      },
      video: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      picOne: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      picTwo: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      bugDescription: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      solutionDescription: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      adminId: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: 'admins', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true
      },
      adminResponseStatus: {
        type: Sequelize.ENUM('approved', 'rejected', 'pending'),
        defaultValue: 'pending',
        allowNull: false
      },
      rejectedReason: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bugLevel: {
        type: Sequelize.ENUM('low', 'mid', 'high'),
        allowNull: true
      },
      payableAmount: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true
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
    await queryInterface.dropTable('projects_reports')
  }
}
