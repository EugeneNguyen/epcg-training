const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');


let type = {
  TgRole: {
    async members(parent, args, context, info) {
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
          }
        }
      });
    },
    membersCount(parent, args, context, info) {
      return db.tgUserRole.count({
        where: {
          roleId: parent.id
        }
      });
    },
    membersLink(parent, args, context, info) {
      return db.tgUserRole.findAll({
        where: {
          roleId: parent.id
        }
      });
    },
    async permission(parent, args, context, info) {
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
          }
        }
      });
    },
    permissionCount(parent, args, context, info) {
      return db.tgRolePermission.count({
        where: {
          roleId: parent.id
        }
      });
    },
    permissionLink(parent, args, context, info) {
      return db.tgRolePermission.findAll({
        where: {
          roleId: parent.id
        }
      });
    },
  },
};

module.exports = type;
