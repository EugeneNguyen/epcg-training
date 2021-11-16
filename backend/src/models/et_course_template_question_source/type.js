const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');


let type = {
  EtCourseTemplateQuestionSource: {
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
