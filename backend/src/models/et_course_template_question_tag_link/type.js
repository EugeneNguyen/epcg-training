const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;

const tagLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateQuestionTag.findAll({
    where: {
      id: {
        [Op.in]: keys,
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
});

const questionLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateQuestionMCQ.findAll({
    where: {
      id: {
        [Op.in]: keys,
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
});


let type = {
  EtCourseTemplateQuestionTagLink: {
    tag(parent, args, context, info) {
      return tagLoader.load(parent.questionTagId);
    },
    question(parent, args, context, info) {
      return questionLoader.load(parent.questionId);
    },
  },
};

module.exports = type;
