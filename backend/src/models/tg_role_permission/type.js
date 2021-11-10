const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');

const roleLoader = new DataLoader(async (keys) => {
  const items = await db.tgRole.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });

const permissionLoader = new DataLoader(async (keys) => {
  const items = await db.tgPermission.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });


let type = {
  TgRolePermission: {
    role(parent, args, context, info) {
      return roleLoader.load(parent.roleId);
    },
    permission(parent, args, context, info) {
      return permissionLoader.load(parent.permissionId);
    },
  },
};

module.exports = type;
