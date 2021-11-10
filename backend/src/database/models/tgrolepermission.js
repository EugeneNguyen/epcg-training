'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class tgRolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tgRolePermission.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    roleId: DataTypes.UUID,
    permissionId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'tgRolePermission',
  });

  tgRolePermission.beforeCreate(o => o.id = uuid.v4());
  return tgRolePermission;
};