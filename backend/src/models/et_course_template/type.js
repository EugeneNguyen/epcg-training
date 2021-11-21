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
      if (parent.educationProviderId) {
        return educationProviderLoader.load(parent.educationProviderId);
      }
      return null;
    },
    questions(parent, {where}, context, info) {
      return db.etCourseTemplateQuestionMCQ.findAll({
        where: {
          courseTemplateId: parent.id,
          ...where,
        }
      });
    },
    questionsCount(parent, {where}, context, info) {
      return db.etCourseTemplateQuestionMCQ.count({
        where: {
          courseTemplateId: parent.id,
          ...where,
        }
      });
    },
    questionSources(parent, {where}, context, info) {
      return db.etCourseTemplateQuestionSource.findAll({
        where: {
          courseTemplateId: parent.id,
          ...where,
        }
      });
    },
    questionSourcesCount(parent, {where}, context, info) {
      return db.etCourseTemplateQuestionSource.count({
        where: {
          courseTemplateId: parent.id,
          ...where,
        }
      });
    },
    tags(parent, {where}, context, info) {
      return db.etCourseTemplateQuestionTag.findAll({
        where: {
          courseTemplateId: parent.id,
          ...where,
        }
      });
    },
    tagsCount(parent, {where}, context, info) {
      return db.etCourseTemplateQuestionTag.count({
        where: {
          courseTemplateId: parent.id,
          ...where,
        }
      });
    },
    exams(parent, {where}, context, info) {
      return db.etCourseTemplateExam.findAll({
        where: {
          courseTemplateId: parent.id,
          ...where,
        }
      });
    },
    examsCount(parent, {where}, context, info) {
      return db.etCourseTemplateExam.count({
        where: {
          courseTemplateId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
