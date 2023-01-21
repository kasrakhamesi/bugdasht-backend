'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class projects_reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      projects_reports.belongsTo(models.organizations_projects, {
        as: 'project',
        foreignKey: 'organizationsProjectId'
      })

      projects_reports.belongsTo(models.hunters)

      projects_reports.belongsTo(models.admins)
    }
  }
  projects_reports.init(
    {
      organizationId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      hunterId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      bugTitle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      organizationsProjectId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      domainOrIp: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cvss: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cve: {
        type: DataTypes.STRING,
        allowNull: false
      },
      vector: {
        type: DataTypes.STRING,
        allowNull: false
      },
      video: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      picOne: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      picTwo: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      bugDescription: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      solutionDescription: {
        type: DataTypes.TEXT('long'),
        allowNull: true
      },
      adminId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      adminResponseStatus: {
        type: DataTypes.ENUM('approved', 'rejected', 'pending'),
        defaultValue: 'pending',
        allowNull: false
      },
      rejectedReason: {
        type: DataTypes.STRING,
        allowNull: true
      },
      bugLevel: {
        type: DataTypes.ENUM('low', 'mid', 'high'),
        allowNull: true
      },
      payableAmount: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'projects_reports'
    }
  )
  return projects_reports
}
