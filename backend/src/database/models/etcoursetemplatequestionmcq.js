'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class etCourseTemplateQuestionMCQ extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  etCourseTemplateQuestionMCQ.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    questionCode: DataTypes.STRING,
    question: DataTypes.TEXT,
    questionImageId: DataTypes.UUID,
    answerA: DataTypes.TEXT,
    answerB: DataTypes.TEXT,
    answerC: DataTypes.TEXT,
    answerD: DataTypes.TEXT,
    correctAnswer: DataTypes.STRING,
    explanation: DataTypes.TEXT,
    score: {
      type: DataTypes.INTEGER
    },
    courseTemplateId: DataTypes.UUID,
    questionSourceId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'etCourseTemplateQuestionMCQ',
  });

  etCourseTemplateQuestionMCQ.beforeCreate(o => o.id = uuid.v4());
  return etCourseTemplateQuestionMCQ;
};