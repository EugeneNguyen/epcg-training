const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');


let type = {
  EtEducationProvider: {
    createdAt(parent) {
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      return moment(parent.updatedAt).format();
    },
    courseTemplates(parent, {where}, context, info) {
      return db.etCourseTemplate.findAll({
        where: {
          educationProviderId: parent.id,
          ...where,
        }
      });
    },
    courseTemplatesCount(parent, {where}, context, info) {
      return db.etCourseTemplate.count({
        where: {
          educationProviderId: parent.id,
          ...where,
        }
      });
    },
    courses(parent, {where}, context, info) {
      return db.etCourse.findAll({
        where: {
          educationProviderId: parent.id,
          ...where,
        }
      });
    },
    coursesCount(parent, {where}, context, info) {
      return db.etCourse.count({
        where: {
          educationProviderId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
