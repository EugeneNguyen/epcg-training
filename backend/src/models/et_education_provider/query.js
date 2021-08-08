let db = require('../../database/models');

let query = {
  et_education_provider_get_all(parent, args, context, info) {
    return db.etEducationProvider.findAll();
  },
  et_education_provider_get_by_id(parent, {id}, context, info) {
    return db.etEducationProvider.findByPk(id);
  },
};

module.exports = query;
