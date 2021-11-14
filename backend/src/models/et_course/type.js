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
      return courseTemplateLoader.load(parent.courseTemplateId);
    },
    educationProvider(parent, args, context, info) {
      return educationProviderLoader.load(parent.educationProviderId);
    },
    enrolls(parent, args, context, info) {
      return db.etCourseEnroll.findAll({
        where: {
          courseId: parent.id
        }
      });
    },
    enrollsCount(parent, args, context, info) {
      return db.etCourseEnroll.count({
        where: {
          courseId: parent.id
        }
      });
    },
    exams(parent, args, context, info) {
      return db.etCourseExam.findAll({
        where: {
          courseId: parent.id
        }
      });
    },
    examsCount(parent, args, context, info) {
      return db.etCourseExam.count({
        where: {
          courseId: parent.id
        }
      });
    },
  },
};

module.exports = type;
