let db = require('../../database/models');

let mutation = {
  async et_education_provider_add(parent, { data }, context, info) {
    return db.etEducationProvider.create({
      name: data.name,
    });
  },
  async et_education_provider_edit(parent, { id, data }, context, info) {
    const etEducationProvider = await db.etEducationProvider.findByPk(id);
    etEducationProvider.name = data.name;
    await etEducationProvider.save();
    await etEducationProvider.reload();

    return etEducationProvider;
  },
  async et_education_provider_delete(parent, { id }, context, info) {
    const etEducationProvider = await db.etEducationProvider.findByPk(id);
    await etEducationProvider.destroy();
    return true;
  },

};

module.exports = mutation;
