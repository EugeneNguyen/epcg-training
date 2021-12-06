'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class etCourseEnroll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  etCourseEnroll.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    courseId: DataTypes.UUID,
    userId: DataTypes.UUID,
    isActive: DataTypes.BOOLEAN,
    isCourseAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'etCourseEnroll',
  });

  etCourseEnroll.beforeCreate(o => o.id = uuid.v4());
  return etCourseEnroll;
};