const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');



let type = {
  TgPermissionGroup: {
    permissions(parent, args, context, info) {
      return db.tgPermission.findAll({
        where: {
          groupId: parent.id
        }
      });
    },
    permissionsCount(parent, args, context, info) {
      return db.tgPermission.count({
        where: {
          groupId: parent.id
        }
      });
    },
  },
};

module.exports = type;
