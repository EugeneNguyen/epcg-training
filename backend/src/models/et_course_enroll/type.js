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

let type = {
  EtCourseEnroll: {
    course(parent, args, context, info) {
      if (parent.courseId) {
        return courseLoader.load(parent.courseId);
      }
      return null;
    },
    user(parent, args, context, info) {
      if (parent.userId) {
        return userLoader.load(parent.userId);
      }
      return null;
    },
  },
};

module.exports = type;
