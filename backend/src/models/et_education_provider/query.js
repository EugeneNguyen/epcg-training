let db = require('../../database/models');

let query = {
  et_education_provider_get_all(parent, args, context, info) {
    return db.etEducationProvider.findAll();
  },
};

module.exports = query;
