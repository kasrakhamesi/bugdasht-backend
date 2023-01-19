'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class hunters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  hunters.init(
    {
      profileImage: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      nationalCode: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
      },
      nickName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birthDate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      shebaNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      twitter: {
        type: DataTypes.STRING,
        allowNull: true
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: true
      },
      bugCrowd: {
        type: DataTypes.STRING,
        allowNull: true
      },
      hackerOne: {
        type: DataTypes.STRING,
        allowNull: true
      },
      balance: {
        type: DataTypes.BIGINT.UNSIGNED,
        defaultValue: 0,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'hunters'
    }
  )
  return hunters
}
