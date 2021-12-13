'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class tgFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tgFile.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    service: {
      type: DataTypes.STRING
    },
    key: {
      type: DataTypes.STRING
    },
    originalName: {
      type: DataTypes.STRING
    },
    extension: {
      type: DataTypes.STRING
    },
    mimeType: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.INTEGER,
    },
    meta: {
      type: DataTypes.TEXT,
    },
    ownerUserId: {
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'tgFile',
  });

  tgFile.beforeCreate(o => o.id = uuid.v4());
  return tgFile;
};