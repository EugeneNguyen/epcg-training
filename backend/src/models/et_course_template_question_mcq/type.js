const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');

const questionSourceLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateQuestionSource.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });
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
  EtCourseTemplateQuestionMcq: {
    questionSource(parent, args, context, info) {
      return questionSourceLoader.load(parent.questionSourceId);
    },
    courseTemplate(parent, args, context, info) {
      return courseTemplateLoader.load(parent.courseTemplateId);
    },
    async tags(parent, args, context, info) {
      const links = await db.etCourseTemplateQuestionTagLink.findAll({
        where: {
          questionId: parent.id
        }
      });
      const ids = links.map(link => link.questionTagId);
      return db.etCourseTemplateQuestionTag.findAll({
        where: {
          id: {
            [Op.in]: ids,
          }
        }
      });
    },
    tagsCount(parent, args, context, info) {
      return db.etCourseTemplateQuestionTagLink.count({
        where: {
          questionId: parent.id
        }
      });
    },
    tagsLink(parent, args, context, info) {
      return db.etCourseTemplateQuestionTagLink.findAll({
        where: {
          questionId: parent.id
        }
      });
    },
  },
};

module.exports = type;
