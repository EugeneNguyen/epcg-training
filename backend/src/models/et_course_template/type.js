const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');

const educationProviderManyToOneLoader = new DataLoader(async (keys) => {
  const items = await db.etEducationProvider.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });
const questionsOneToManyLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateQuestionMCQ.findAll({
    where: {
      courseTemplateId: {
        [Op.in]: _.uniq(keys),
      },
    }
  });
  return keys.map(key => items.filter(item => item.courseTemplateId === key));
}, { cache: false });
const questionSourcesOneToManyLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateQuestionSource.findAll({
    where: {
      courseTemplateId: {
        [Op.in]: _.uniq(keys),
      },
    }
  });
  return keys.map(key => items.filter(item => item.courseTemplateId === key));
}, { cache: false });
const tagsOneToManyLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateQuestionTag.findAll({
    where: {
      courseTemplateId: {
        [Op.in]: _.uniq(keys),
      },
    }
  });
  return keys.map(key => items.filter(item => item.courseTemplateId === key));
}, { cache: false });
const examsOneToManyLoader = new DataLoader(async (keys) => {
  const items = await db.etCourseTemplateExam.findAll({
    where: {
      courseTemplateId: {
        [Op.in]: _.uniq(keys),
      },
    }
  });
  return keys.map(key => items.filter(item => item.courseTemplateId === key));
}, { cache: false });

let type = {
  EtCourseTemplate: {
    createdAt(parent) {
      if (parent.createdAt == null) return null;
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      if (parent.updatedAt == null) return null;
      return moment(parent.updatedAt).format();
    },
    educationProvider(parent, args, context, info) {
      if (parent.educationProviderId) {
        return educationProviderManyToOneLoader.load(parent.educationProviderId);
      }
      return null;
    },
    questions(parent, {where}, context, info) {
      if (!where) {
        if (parent.id) {
          return questionsOneToManyLoader.load(parent.id);
        }
        return null;
      }
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
      if (!where) {
        if (parent.id) {
          return questionSourcesOneToManyLoader.load(parent.id);
        }
        return null;
      }
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
      if (!where) {
        if (parent.id) {
          return tagsOneToManyLoader.load(parent.id);
        }
        return null;
      }
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
      if (!where) {
        if (parent.id) {
          return examsOneToManyLoader.load(parent.id);
        }
        return null;
      }
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
