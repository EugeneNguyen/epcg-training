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
const userLoader = new DataLoader(async (keys) => {
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
  TgUserRole: {
    role(parent, args, context, info) {
      return roleLoader.load(parent.roleId);
    },
    user(parent, args, context, info) {
      return userLoader.load(parent.userId);
    },
  },
};

module.exports = type;
