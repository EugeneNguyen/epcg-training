let db = require('../../database/models');

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
