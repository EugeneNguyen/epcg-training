const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;
const _ = require('lodash');



let type = {
  EtExamAttempt: {
    questions(parent, args, context, info) {
      return db.etExamAttemptQuestion.findAll({
        where: {
          attemptId: parent.id
        }
      });
    },
    questionsCount(parent, args, context, info) {
      return db.etExamAttemptQuestion.count({
        where: {
          attemptId: parent.id
        }
      });
    },
  },
};

module.exports = type;
