const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');



let type = {
  EtCourseTemplateQuestionSource: {
    questions(parent, args, context, info) {
      return db.etCourseTemplateQuestionMCQ.findAll({
        where: {
          questionSourceId: parent.id
        }
      });
    },
    questionsCount(parent, args, context, info) {
      return db.etCourseTemplateQuestionMCQ.count({
        where: {
          questionSourceId: parent.id
        }
      });
    },
  },
};

module.exports = type;
