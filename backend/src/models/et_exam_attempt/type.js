const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');

const questionsOneToManyLoader = new DataLoader(async (keys) => {
  const items = await db.etExamAttemptQuestion.findAll({
    where: {
      attemptId: {
        [Op.in]: _.uniq(keys),
      },
    }
  });
  return keys.map(key => items.filter(item => item.attemptId === key));
}, { cache: false });
const templateExamManyToOneLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateExam.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });
const userManyToOneLoader = new DataLoader(async (keys) => {
  const items = await db.tgUser.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });
const examManyToOneLoader = new DataLoader(async (keys) => {
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
      if (parent.startTime == null) return null;
      return moment(parent.startTime).format();
    },
    endTime(parent) {
      if (parent.endTime == null) return null;
      return moment(parent.endTime).format();
    },
    createdAt(parent) {
      if (parent.createdAt == null) return null;
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      if (parent.updatedAt == null) return null;
      return moment(parent.updatedAt).format();
    },
    questions(parent, {where}, context, info) {
      if (!where) {
        if (parent.id) {
          return questionsOneToManyLoader.load(parent.id);
        }
        return null;
      }
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
        return templateExamManyToOneLoader.load(parent.templateExamId);
      }
      return null;
    },
    user(parent, args, context, info) {
      if (parent.userId) {
        return userManyToOneLoader.load(parent.userId);
      }
      return null;
    },
    exam(parent, args, context, info) {
      if (parent.examId) {
        return examManyToOneLoader.load(parent.examId);
      }
      return null;
    },
  },
};

module.exports = type;
