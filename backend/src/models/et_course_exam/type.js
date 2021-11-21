const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
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
  },
};

module.exports = type;
