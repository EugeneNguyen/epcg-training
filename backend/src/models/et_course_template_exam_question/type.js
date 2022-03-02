const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');

const questionLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateQuestionMCQ.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });

let type = {
  EtCourseTemplateExamQuestion: {
    createdAt(parent) {
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      return moment(parent.updatedAt).format();
    },
    question(parent, args, context, info) {
      if (parent.questionId) {
        return questionLoader.load(parent.questionId);
      }
      return null;
    },
  },
};

module.exports = type;
