const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');

const groupManyToOneLoader = new DataLoader(async (keys) => {
  const items = await db.tgPermissionGroup.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });

let type = {
  TgPermission: {
    createdAt(parent) {
      if (parent.createdAt == null) return null;
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      if (parent.updatedAt == null) return null;
      return moment(parent.updatedAt).format();
    },
    group(parent, args, context, info) {
      if (parent.groupId) {
        return groupManyToOneLoader.load(parent.groupId);
      }
      return null;
    },
    async roles(parent, {where}, context, info) {
      const links = await db.tgRolePermission.findAll({
        where: {
          permissionId: parent.id
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
      return db.tgRolePermission.count({
        where: {
          permissionId: parent.id,
          ...where,
        }
      });
    },
    rolesLink(parent, {where}, context, info) {
      return db.tgRolePermission.findAll({
        where: {
          permissionId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
