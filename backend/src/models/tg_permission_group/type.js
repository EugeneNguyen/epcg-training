const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');


let type = {
  TgPermissionGroup: {
    createdAt(parent) {
      if (parent.createdAt == null) return null;
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      if (parent.updatedAt == null) return null;
      return moment(parent.updatedAt).format();
    },
    permissions(parent, {where}, context, info) {
      return db.tgPermission.findAll({
        where: {
          groupId: parent.id,
          ...where,
        }
      });
    },
    permissionsCount(parent, {where}, context, info) {
      return db.tgPermission.count({
        where: {
          groupId: parent.id,
          ...where,
        }
      });
    },
  },
};

module.exports = type;
