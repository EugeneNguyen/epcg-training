const db = require('../../database/models');
const DataLoader = require('dataloader');
const Op = db.Sequelize.Op;



let type = {
  EtEducationProvider: {
    courseTemplates(parent, args, context, info) {
      return db.etCourseTemplate.findAll({
        where: {
          educationProviderId: parent.id
        }
      });
    },
    courseTemplatesCount(parent, args, context, info) {
      return db.etCourseTemplate.count({
        where: {
          educationProviderId: parent.id
        }
      });
    },
  },
};

module.exports = type;
