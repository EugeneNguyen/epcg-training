const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');

const courseTemplateManyToOneLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplate.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });
const educationProviderManyToOneLoader = new DataLoader(async (keys) => {
  const items = await db.etEducationProvider.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });
const enrollsOneToManyLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseEnroll.findAll({
    where: {
      courseId: {
        [Op.in]: _.uniq(keys),
      },
    }
  });
  return keys.map(key => items.filter(item => item.courseId === key));
}, { cache: false });
const examsOneToManyLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseExam.findAll({
    where: {
      courseId: {
        [Op.in]: _.uniq(keys),
      },
    }
  });
  return keys.map(key => items.filter(item => item.courseId === key));
}, { cache: false });

let type = {
  EtCourse: {
    createdAt(parent) {
      if (parent.createdAt == null) return null;
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      if (parent.updatedAt == null) return null;
      return moment(parent.updatedAt).format();
    },
    courseTemplate(parent, args, context, info) {
      if (parent.courseTemplateId) {
        return courseTemplateManyToOneLoader.load(parent.courseTemplateId);
      }
      return null;
    },
    educationProvider(parent, args, context, info) {
      if (parent.educationProviderId) {
        return educationProviderManyToOneLoader.load(parent.educationProviderId);
      }
      return null;
    },
    enrolls(parent, {where}, context, info) {
      if (!where) {
        if (parent.id) {
          return enrollsOneToManyLoader.load(parent.id);
        }
        return null;
      }
      return db.etCourseEnroll.findAll({
        where: {
          courseId: parent.id,
          ...where,
        }
      });
    },
    enrollsCount(parent, {where}, context, info) {
      return db.etCourseEnroll.count({
        where: {
          courseId: parent.id,
          ...where,
        }
      });
    },
    exams(parent, {where}, context, info) {
      if (!where) {
        if (parent.id) {
          return examsOneToManyLoader.load(parent.id);
        }
        return null;
      }
      return db.etCourseExam.findAll({
        where: {
          courseId: parent.id,
          ...where,
        }
      });
    },
    examsCount(parent, {where}, context, info) {
      return db.etCourseExam.count({
        where: {
          courseId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
