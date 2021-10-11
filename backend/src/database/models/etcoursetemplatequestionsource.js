'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class etCourseTemplateQuestionSource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  etCourseTemplateQuestionSource.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING
    },
    courseTemplateId: {
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'etCourseTemplateQuestionSource',
  });

  etCourseTemplateQuestionSource.beforeCreate(o => o.id = uuid.v4());
  return etCourseTemplateQuestionSource;
};