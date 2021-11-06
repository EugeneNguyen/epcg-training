const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');


const templateExamLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateExam.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });


let type = {
  EtExamAttempt: {
    questions(parent, args, context, info) {
      return db.etExamAttemptQuestion.findAll({
        where: {
          attemptId: parent.id
        }
      });
    },
    questionsCount(parent, args, context, info) {
      return db.etExamAttemptQuestion.count({
        where: {
          attemptId: parent.id
        }
      });
    },
    templateExam(parent, args, context, info) {
      return templateExamLoader.load(parent.templateExamId);
    },
  },
};

module.exports = type;
