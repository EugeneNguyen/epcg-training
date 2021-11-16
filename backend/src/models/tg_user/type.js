const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');


let type = {
  TgUser: {
    tokens(parent, {where}, context, info) {
      return db.tgUserToken.findAll({
        where: {
          userId: parent.id,
          ...where,
        }
      });
    },
    tokensCount(parent, {where}, context, info) {
      return db.tgUserToken.count({
        where: {
          userId: parent.id,
          ...where,
        }
      });
    },
    async permissions(parent, {where}, context, info) {
      const links = await db.tgUserPermission.findAll({
        where: {
          userId: parent.id
        }
      });
      const ids = links.map(link => link.permissionId);
      return db.tgPermission.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
          ...where,
        }
      });
    },
    permissionsCount(parent, {where}, context, info) {
      return db.tgUserPermission.count({
        where: {
          userId: parent.id,
          ...where,
        }
      });
    },
    permissionsLink(parent, {where}, context, info) {
      return db.tgUserPermission.findAll({
        where: {
          userId: parent.id,
          ...where,
        }
      });
    },
    async roles(parent, {where}, context, info) {
      const links = await db.tgUserRole.findAll({
        where: {
          userId: parent.id
        }
      });
      const ids = links.map(link => link.roleId);
      return db.tgRole.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
          ...where,
        }
      });
    },
    rolesCount(parent, {where}, context, info) {
      return db.tgUserRole.count({
        where: {
          userId: parent.id,
          ...where,
        }
      });
    },
    rolesLink(parent, {where}, context, info) {
      return db.tgUserRole.findAll({
        where: {
          userId: parent.id,
          ...where,
        }
      });
    },
    async courses(parent, {where}, context, info) {
      const links = await db.etCourseEnroll.findAll({
        where: {
          userId: parent.id
        }
      });
      const ids = links.map(link => link.courseId);
      return db.etCourse.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
          ...where,
        }
      });
    },
    coursesCount(parent, {where}, context, info) {
      return db.etCourseEnroll.count({
        where: {
          userId: parent.id,
          ...where,
        }
      });
    },
    coursesLink(parent, {where}, context, info) {
      return db.etCourseEnroll.findAll({
        where: {
          userId: parent.id,
          ...where,
        }
      });
    },
    examAttempts(parent, {where}, context, info) {
      return db.etExamAttempt.findAll({
        where: {
          userId: parent.id,
          ...where,
        }
      });
    },
    examAttemptsCount(parent, {where}, context, info) {
      return db.etExamAttempt.count({
        where: {
          userId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
