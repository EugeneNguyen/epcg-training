const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');

const courseTemplatesOneToManyLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplate.findAll({
    where: {
      educationProviderId: {
        [Op.in]: _.uniq(keys),
      },
    }
  });
  return keys.map(key => items.filter(item => item.educationProviderId === key));
}, { cache: false });
const coursesOneToManyLoader = new DataLoader(async (keys) => {
  const items = await db.etCourse.findAll({
    where: {
      educationProviderId: {
        [Op.in]: _.uniq(keys),
      },
    }
  });
  return keys.map(key => items.filter(item => item.educationProviderId === key));
}, { cache: false });

let type = {
  EtEducationProvider: {
    createdAt(parent) {
      if (parent.createdAt == null) return null;
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      if (parent.updatedAt == null) return null;
      return moment(parent.updatedAt).format();
    },
    courseTemplates(parent, {where}, context, info) {
      if (!where) {
        if (parent.id) {
          return courseTemplatesOneToManyLoader.load(parent.id);
        }
        return null;
      }
      return db.etCourseTemplate.findAll({
        where: {
          educationProviderId: parent.id,
          ...where,
        }
      });
    },
    courseTemplatesCount(parent, {where}, context, info) {
      return db.etCourseTemplate.count({
        where: {
          educationProviderId: parent.id,
          ...where,
        }
      });
    },
    courses(parent, {where}, context, info) {
      if (!where) {
        if (parent.id) {
          return coursesOneToManyLoader.load(parent.id);
        }
        return null;
      }
      return db.etCourse.findAll({
        where: {
          educationProviderId: parent.id,
          ...where,
        }
      });
    },
    coursesCount(parent, {where}, context, info) {
      return db.etCourse.count({
        where: {
          educationProviderId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
