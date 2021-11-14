const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
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
    question(parent, args, context, info) {
      return questionLoader.load(parent.questionId);
    },
  },
};

module.exports = type;
