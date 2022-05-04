const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');



let type = {
  EtCourseTemplateQuestionSource: {
    createdAt(parent) {
      if (parent.createdAt == null) return null;
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      if (parent.updatedAt == null) return null;
      return moment(parent.updatedAt).format();
    },
    questions(parent, {where}, context, info) {
      return db.etCourseTemplateQuestionMCQ.findAll({
        where: {
          questionSourceId: parent.id,
          ...where,
        }
      });
    },
    questionsCount(parent, {where}, context, info) {
      return db.etCourseTemplateQuestionMCQ.count({
        where: {
          questionSourceId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
