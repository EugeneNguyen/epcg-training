const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
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
    createdAt(parent) {
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      return moment(parent.updatedAt).format();
    },
    courseTemplate(parent, args, context, info) {
      if (parent.courseTemplateId) {
        return courseTemplateLoader.load(parent.courseTemplateId);
      }
      return null;
    },
    async questions(parent, {where}, context, info) {
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
          },
          ...where,
        }
      });
    },
    questionsCount(parent, {where}, context, info) {
      return db.etCourseTemplateExamQuestion.count({
        where: {
          examId: parent.id,
          ...where,
        }
      });
    },
    questionsLink(parent, {where}, context, info) {
      return db.etCourseTemplateExamQuestion.findAll({
        where: {
          examId: parent.id,
          ...where,
        }
      });
    },
    attempts(parent, {where}, context, info) {
      return db.etExamAttempt.findAll({
        where: {
          templateExamId: parent.id,
          ...where,
        }
      });
    },
    attemptsCount(parent, {where}, context, info) {
      return db.etExamAttempt.count({
        where: {
          templateExamId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
