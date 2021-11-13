const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');

const groupLoader = new DataLoader(async (keys) => {
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
    group(parent, args, context, info) {
      return groupLoader.load(parent.groupId);
    },
    async roles(parent, args, context, info) {
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
          }
        }
      });
    },
    rolesCount(parent, args, context, info) {
      return db.tgRolePermission.count({
        where: {
          permissionId: parent.id
        }
      });
    },
    rolesLink(parent, args, context, info) {
      return db.tgRolePermission.findAll({
        where: {
          permissionId: parent.id
        }
      });
    },
  },
};

module.exports = type;