const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');





let type = {
  TgUser: {
    tokens(parent, args, context, info) {
      return db.tgUserToken.findAll({
        where: {
          userId: parent.id
        }
      });
    },
    tokensCount(parent, args, context, info) {
      return db.tgUserToken.count({
        where: {
          userId: parent.id
        }
      });
    },
    async permissions(parent, args, context, info) {
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
          }
        }
      });
    },
    permissionsCount(parent, args, context, info) {
      return db.tgUserPermission.count({
        where: {
          userId: parent.id
        }
      });
    },
    permissionsLink(parent, args, context, info) {
      return db.tgUserPermission.findAll({
        where: {
          userId: parent.id
        }
      });
    },
    async roles(parent, args, context, info) {
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
          }
        }
      });
    },
    rolesCount(parent, args, context, info) {
      return db.tgUserRole.count({
        where: {
          userId: parent.id
        }
      });
    },
    rolesLink(parent, args, context, info) {
      return db.tgUserRole.findAll({
        where: {
          userId: parent.id
        }
      });
    },
  },
};

module.exports = type;
