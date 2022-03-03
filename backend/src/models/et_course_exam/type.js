const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');

const courseLoader = new DataLoader(async (keys) => {
  const items = await db.etCourse.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });
const courseTemplateExamLoader = new DataLoader(async (keys) => {
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
  EtCourseExam: {
    createdAt(parent) {
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      return moment(parent.updatedAt).format();
    },
    course(parent, args, context, info) {
      if (parent.courseId) {
        return courseLoader.load(parent.courseId);
      }
      return null;
    },
    courseTemplateExam(parent, args, context, info) {
      if (parent.courseTemplateExamId) {
        return courseTemplateExamLoader.load(parent.courseTemplateExamId);
      }
      return null;
    },
    attempts(parent, {where}, context, info) {
      return db.etExamAttempt.findAll({
        where: {
          examId: parent.id,
          ...where,
        }
      });
    },
    attemptsCount(parent, {where}, context, info) {
      return db.etExamAttempt.count({
        where: {
          examId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
