const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
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
const userLoader = new DataLoader(async (keys) => {
  const items = await db.tgUser.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });
const examLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseExam.findAll({
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
    startTime(parent) {
      return moment(parent.startTime).format();
    },
    endTime(parent) {
      return moment(parent.endTime).format();
    },
    createdAt(parent) {
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      return moment(parent.updatedAt).format();
    },
    questions(parent, {where}, context, info) {
      return db.etExamAttemptQuestion.findAll({
        where: {
          attemptId: parent.id,
          ...where,
        }
      });
    },
    questionsCount(parent, {where}, context, info) {
      return db.etExamAttemptQuestion.count({
        where: {
          attemptId: parent.id,
          ...where,
        }
      });
    },
    templateExam(parent, args, context, info) {
      if (parent.templateExamId) {
        return templateExamLoader.load(parent.templateExamId);
      }
      return null;
    },
    user(parent, args, context, info) {
      if (parent.userId) {
        return userLoader.load(parent.userId);
      }
      return null;
    },
    exam(parent, args, context, info) {
      if (parent.examId) {
        return examLoader.load(parent.examId);
      }
      return null;
    },
  },
};

module.exports = type;
