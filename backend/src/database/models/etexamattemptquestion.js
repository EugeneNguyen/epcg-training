'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class etExamAttemptQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  etExamAttemptQuestion.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    attemptId: {
      type: DataTypes.UUID
    },
    questionId: {
      type: DataTypes.UUID
    },
    order: {
      type: DataTypes.INTEGER,
    },
    displayedQuestionData: {
      type: DataTypes.TEXT,
    },
    fullQuestionData: {
      type: DataTypes.TEXT,
    },
    answer: {
      type: DataTypes.STRING,
    },
    rawAnswer: {
      type: DataTypes.STRING,
    },
    correct: {
      type: DataTypes.BOOLEAN,
    },
    flag: {
      type: DataTypes.BOOLEAN,
    },
    startTime: {
      type: DataTypes.DATE
    },
    endTime: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'etExamAttemptQuestion',
  });

  etExamAttemptQuestion.beforeCreate(o => o.id = uuid.v4());
  return etExamAttemptQuestion;
};