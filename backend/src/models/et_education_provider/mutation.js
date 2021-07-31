let db = require('../../database/models');

let mutation = {
  et_education_provider_add(parent, { data: { name } }, context, info) {
    return db.etEducationProvider.create({
      name,
    });
  },
};

module.exports = mutation;
