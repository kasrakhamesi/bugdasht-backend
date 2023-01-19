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
    }
  }
  projects_reports.init(
    {
      bugTitle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      projectId: {
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
      }
    },
    {
      sequelize,
      modelName: 'projects_reports'
    }
  )
  return projects_reports
}
