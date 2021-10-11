const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;

const questionSourceLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateQuestionSource.findAll({
    where: {
      id: {
        [Op.in]: keys,
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
});

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
  EtCourseTemplateQuestionMcq: {
    questionSource(parent, args, context, info) {
      return questionSourceLoader.load(parent.questionSourceId);
    },
    courseTemplate(parent, args, context, info) {
      return courseTemplateLoader.load(parent.courseTemplateId);
    },
    tags(parent, args, context, info) {
      return db.etCourseTemplateQuestionTag.findOne({
        where: {
          id: parent.id
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