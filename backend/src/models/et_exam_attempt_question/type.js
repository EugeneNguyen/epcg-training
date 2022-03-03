const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const moment = require('moment');
const _ = require('lodash');


let type = {
  EtExamAttemptQuestion: {
    startTime(parent) {
      return moment(parent.startTime).format();
    },
    endTime(parent) {
      return moment(parent.endTime).format();
    },
    createdAt(parent) {
      return moment(parent.createdAt).format();
    },
    updatedAt(parent) {
      return moment(parent.updatedAt).format();
    },
  },
};

module.exports = type;
