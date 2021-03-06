const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');

const educationProviderLoader = new DataLoader(async (keys) => {
  const items = await db.etEducationProvider.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });

let type = {
  EtCourseTemplate: {
    educationProvider(parent, args, context, info) {
      return educationProviderLoader.load(parent.educationProviderId);
    },
    questions(parent, args, context, info) {
      return db.etCourseTemplateQuestionMCQ.findAll({
        where: {
          courseTemplateId: parent.id
        }
      });
    },
    questionsCount(parent, args, context, info) {
      return db.etCourseTemplateQuestionMCQ.count({
        where: {
          courseTemplateId: parent.id
        }
      });
    },
    questionSources(parent, args, context, info) {
      return db.etCourseTemplateQuestionSource.findAll({
        where: {
          courseTemplateId: parent.id
        }
      });
    },
    questionSourcesCount(parent, args, context, info) {
      return db.etCourseTemplateQuestionSource.count({
        where: {
          courseTemplateId: parent.id
        }
      });
    },
    tags(parent, args, context, info) {
      return db.etCourseTemplateQuestionTag.findAll({
        where: {
          courseTemplateId: parent.id
        }
      });
    },
    tagsCount(parent, args, context, info) {
      return db.etCourseTemplateQuestionTag.count({
        where: {
          courseTemplateId: parent.id
        }
      });
    },
    exams(parent, args, context, info) {
      return db.etCourseTemplateExam.findAll({
        where: {
          courseTemplateId: parent.id
        }
      });
    },
    examsCount(parent, args, context, info) {
      return db.etCourseTemplateExam.count({
        where: {
          courseTemplateId: parent.id
        }
      });
    },
  },
};

module.exports = type;
