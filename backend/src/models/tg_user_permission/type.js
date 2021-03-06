const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');

const permissionManyToOneLoader = new DataLoader(async (keys) => {
  const items = await db.tgPermission.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });
const userManyToOneLoader = new DataLoader(async (keys) => {
  const items = await db.tgUser.findAll({
    where: {
      id: {
        [Op.in]: _.uniq(keys),
      },
    },
  });
  return keys.map(key => items.find(item => item.id === key));
}, { cache: false });

let type = {
  TgUserPermission: {
    createdAt(parent) {
      if (parent.createdAt == null) return null;
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      if (parent.updatedAt == null) return null;
      return moment(parent.updatedAt).format();
    },
    permission(parent, args, context, info) {
      if (parent.permissionId) {
        return permissionManyToOneLoader.load(parent.permissionId);
      }
      return null;
    },
    user(parent, args, context, info) {
      if (parent.userId) {
        return userManyToOneLoader.load(parent.userId);
      }
      return null;
    },
  },
};

module.exports = type;
