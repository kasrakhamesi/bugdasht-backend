'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class organizations_projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  organizations_projects.init(
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
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      isVip: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      lowPrice: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      midPrice: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      highPrice: {
        type: DataTypes.BIGINT.UNSIGNED,
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
      paymentAmount: {
        type: DataTypes.BIGINT.UNSIGNED,
        defaultValue: null,
        allowNull: null
      },
      hasPayment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      adminId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: { model: 'admins', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM(
          'pending',
          'canceled',
          'approved_for_payment',
          'approved',
          'end_of_budget'
        ),
        defaultValue: 'pending',
        allowNull: false
      },
      canceledReason: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      startAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      expireAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'organizations_projects'
    }
  )
  return organizations_projects
}
