const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');


let type = {
  TgFile: {
  },
};

module.exports = type;
