const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
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
    createdAt(parent) {
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      return moment(parent.updatedAt).format();
    },
    role(parent, args, context, info) {
      if (parent.roleId) {
        return roleLoader.load(parent.roleId);
      }
      return null;
    },
    permission(parent, args, context, info) {
      if (parent.permissionId) {
        return permissionLoader.load(parent.permissionId);
      }
      return null;
    },
  },
};

module.exports = type;
