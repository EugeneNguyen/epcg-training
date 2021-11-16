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
  EtCourseTemplateQuestionTag: {
    courseTemplate(parent, args, context, info) {
      return courseTemplateLoader.load(parent.courseTemplateId);
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
