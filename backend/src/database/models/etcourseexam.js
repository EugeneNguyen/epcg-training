'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class etCourseExam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  etCourseExam.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    name: DataTypes.STRING,
    courseId: DataTypes.UUID,
    courseTemplateExamId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'etCourseExam',
  });

  etCourseExam.beforeCreate(o => o.id = uuid.v4());
  return etCourseExam;
};