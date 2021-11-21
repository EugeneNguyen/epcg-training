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
const educationProviderLoader = new DataLoader(async (keys) => {
  const items = await db.etEducationProvider.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });

let type = {
  EtCourse: {
    courseTemplate(parent, args, context, info) {
      if (parent.courseTemplateId) {
        return courseTemplateLoader.load(parent.courseTemplateId);
      }
      return null;
    },
    educationProvider(parent, args, context, info) {
      if (parent.educationProviderId) {
        return educationProviderLoader.load(parent.educationProviderId);
      }
      return null;
    },
    enrolls(parent, {where}, context, info) {
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
