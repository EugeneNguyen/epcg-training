const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
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
  EtCourseTemplateQuestionTag: {
    createdAt(parent) {
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      return moment(parent.updatedAt).format();
    },
    courseTemplate(parent, args, context, info) {
      if (parent.courseTemplateId) {
        return courseTemplateLoader.load(parent.courseTemplateId);
      }
      return null;
    },
    async questions(parent, {where}, context, info) {
      const links = await db.etCourseTemplateQuestionTagLink.findAll({
        where: {
          questionTagId: parent.id
        }
      });
      const ids = links.map(link => link.questionId);
      return db.etCourseTemplateQuestionMCQ.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
          ...where,
        }
      });
    },
    questionsCount(parent, {where}, context, info) {
      return db.etCourseTemplateQuestionTagLink.count({
        where: {
          questionTagId: parent.id,
          ...where,
        }
      });
    },
    questionsLink(parent, {where}, context, info) {
      return db.etCourseTemplateQuestionTagLink.findAll({
        where: {
          questionTagId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
