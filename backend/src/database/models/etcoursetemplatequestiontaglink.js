'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class etCourseTemplateQuestionTagLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  etCourseTemplateQuestionTagLink.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    questionId: {
      type: DataTypes.UUID,
    },
    questionTagId: {
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'etCourseTemplateQuestionTagLink',
  });

  etCourseTemplateQuestionTagLink.beforeCreate(o => o.id = uuid.v4());
  return etCourseTemplateQuestionTagLink;
};