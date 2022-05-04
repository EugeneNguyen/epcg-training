const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');

const courseManyToOneLoader = new DataLoader(async (keys) => {
  const items = await db.etCourse.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });
const courseTemplateExamManyToOneLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateExam.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });
const attemptsOneToManyLoader = new DataLoader(async (keys) => {
  const items = await db.etExamAttempt.findAll({
    where: {
      examId: {
        [Op.in]: _.uniq(keys),
      },
    }
  });
  return keys.map(key => items.filter(item => item.examId === key));
}, { cache: false });

let type = {
  EtCourseExam: {
    createdAt(parent) {
      if (parent.createdAt == null) return null;
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      if (parent.updatedAt == null) return null;
      return moment(parent.updatedAt).format();
    },
    course(parent, args, context, info) {
      if (parent.courseId) {
        return courseManyToOneLoader.load(parent.courseId);
      }
      return null;
    },
    courseTemplateExam(parent, args, context, info) {
      if (parent.courseTemplateExamId) {
        return courseTemplateExamManyToOneLoader.load(parent.courseTemplateExamId);
      }
      return null;
    },
    attempts(parent, {where}, context, info) {
      if (!where) {
        if (parent.id) {
          return attemptsOneToManyLoader.load(parent.id);
        }
        return null;
      }
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
