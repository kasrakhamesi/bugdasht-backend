'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class organizations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  organizations.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      delegateName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('pending', 'rejected', 'approved'),
        defaultValue: 'pending',
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'organizations'
    }
  )
  return organizations
}
