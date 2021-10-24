const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');

const courseTemplateLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplate.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });




let type = {
  EtCourseTemplateExam: {
    courseTemplate(parent, args, context, info) {
      return courseTemplateLoader.load(parent.courseTemplateId);
    },
    async questions(parent, args, context, info) {
      const links = await db.etCourseTemplateExamQuestion.findAll({
        where: {
          examId: parent.id
        }
      });
      const ids = links.map(link => link.questionId);
      return db.etCourseTemplateQuestionMCQ.findAll({
        where: {
          id: {
            [Op.in]: ids,
          }
        }
      });
    },
    questionsCount(parent, args, context, info) {
      return db.etCourseTemplateExamQuestion.count({
        where: {
          examId: parent.id
        }
      });
    },
    questionsLink(parent, args, context, info) {
      return db.etCourseTemplateExamQuestion.findAll({
        where: {
          examId: parent.id
        }
      });
    },
    attempts(parent, args, context, info) {
      return db.etExamAttempt.findAll({
        where: {
          templateExamId: parent.id
        }
      });
    },
    attemptsCount(parent, args, context, info) {
      return db.etExamAttempt.count({
        where: {
          templateExamId: parent.id
        }
      });
    },
  },
};

module.exports = type;
