const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;

const courseTemplateLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplate.findAll({
    where: {
      id: {
        [Op.in]: keys,
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
});



let type = {
  EtCourseTemplateQuestionTag: {
    courseTemplate(parent, args, context, info) {
      return courseTemplateLoader.load(parent.courseTemplateId);
    },
    questions(parent, args, context, info) {
      return db.etCourseTemplateQuestionMCQ.findOne({
        where: {
          id: parent.id
        }
      });
    },
    questionsCount(parent, args, context, info) {
      return db.etCourseTemplateQuestionTagLink.count({
        where: {
          questionTagId: parent.id
        }
      });
    },
    questionsLink(parent, args, context, info) {
      return db.etCourseTemplateQuestionTagLink.findAll({
        where: {
          questionTagId: parent.id
        }
      });
    },
  },
};

module.exports = type;
