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


let type = {
  EtCourse: {
    courseTemplate(parent, args, context, info) {
      return courseTemplateLoader.load(parent.courseTemplateId);
    },
  },
};

module.exports = type;
