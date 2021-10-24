'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class etCourseTemplateExam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  etCourseTemplateExam.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.INTEGER
    },
    numberOfQuestion: {
      type: DataTypes.INTEGER
    },
    unlimitedTime: {
      type: DataTypes.BOOLEAN
    },
    randomQuestionOrder: {
      type: DataTypes.BOOLEAN
    },
    randomChoiceOrder: {
      type: DataTypes.BOOLEAN
    },
    courseTemplateId: {
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'etCourseTemplateExam',
  });

  etCourseTemplateExam.beforeCreate(o => o.id = uuid.v4());
  return etCourseTemplateExam;
};