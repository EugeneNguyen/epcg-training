const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');


let type = {
  EtExamAttemptQuestion: {
    startTime(parent) {
      if (parent.startTime == null) return null;
      return moment(parent.startTime).format();
    },
    endTime(parent) {
      if (parent.endTime == null) return null;
      return moment(parent.endTime).format();
    },
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
