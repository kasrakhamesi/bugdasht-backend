'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class organization_projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  organization_projects.init(
    {
      organizationId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      budget: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isVip: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      lowPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      midPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      highPrice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: false
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'organization_projects'
    }
  )
  return organization_projects
}
