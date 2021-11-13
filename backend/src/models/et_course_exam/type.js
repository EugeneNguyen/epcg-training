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
      return courseLoader.load(parent.courseId);
    },
    courseTemplateExam(parent, args, context, info) {
      return courseTemplateExamLoader.load(parent.courseTemplateExamId);
    },
  },
};

module.exports = type;
