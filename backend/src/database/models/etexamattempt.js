'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class etExamAttempt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  etExamAttempt.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID
    },
    templateExamId: {
      type: DataTypes.UUID
    },
    duration: {
      type: DataTypes.INTEGER
    },
    startTime: {
      type: DataTypes.DATE
    },
    endTime: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'etExamAttempt',
  });

  etExamAttempt.beforeCreate(o => o.id = uuid.v4());
  return etExamAttempt;
};