const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');


let type = {
  TgRole: {
    async members(parent, {where}, context, info) {
      const links = await db.tgUserRole.findAll({
        where: {
          roleId: parent.id
        }
      });
      const ids = links.map(link => link.userId);
      return db.tgUser.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
          ...where,
        }
      });
    },
    membersCount(parent, {where}, context, info) {
      return db.tgUserRole.count({
        where: {
          roleId: parent.id,
          ...where,
        }
      });
    },
    membersLink(parent, {where}, context, info) {
      return db.tgUserRole.findAll({
        where: {
          roleId: parent.id,
          ...where,
        }
      });
    },
    async permission(parent, {where}, context, info) {
      const links = await db.tgRolePermission.findAll({
        where: {
          roleId: parent.id
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
    permissionCount(parent, {where}, context, info) {
      return db.tgRolePermission.count({
        where: {
          roleId: parent.id,
          ...where,
        }
      });
    },
    permissionLink(parent, {where}, context, info) {
      return db.tgRolePermission.findAll({
        where: {
          roleId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
