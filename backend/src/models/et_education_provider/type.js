const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');


let type = {
  EtEducationProvider: {
    courseTemplates(parent, args, context, info) {
      return db.etCourseTemplate.findAll({
        where: {
          educationProviderId: parent.id
        }
      });
    },
    courseTemplatesCount(parent, args, context, info) {
      return db.etCourseTemplate.count({
        where: {
          educationProviderId: parent.id
        }
      });
    },
    courses(parent, args, context, info) {
      return db.etCourse.findAll({
        where: {
          educationProviderId: parent.id
        }
      });
    },
    coursesCount(parent, args, context, info) {
      return db.etCourse.count({
        where: {
          educationProviderId: parent.id
        }
      });
    },
  },
};

module.exports = type;
