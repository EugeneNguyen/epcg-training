'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class tgPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tgPermission.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    groupId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'tgPermission',
  });

  tgPermission.beforeCreate(o => o.id = uuid.v4());
  return tgPermission;
};