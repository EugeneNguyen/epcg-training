const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');


let type = {
  TgUserToken: {
    createdAt(parent) {
      if (parent.createdAt == null) return null;
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      if (parent.updatedAt == null) return null;
      return moment(parent.updatedAt).format();
    },
  },
};

module.exports = type;
