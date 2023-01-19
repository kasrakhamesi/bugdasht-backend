'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class vulnerabilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vulnerabilities.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      metaData: {
        type: DataTypes.JSON,
        allowNull: true
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'vulnerabilities'
    }
  )
  return vulnerabilities
}
