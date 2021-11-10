let db = require('../../database/models');

let mutation = {
  async tg_role_add(parent, { data }, context, info) {
    const newObject = await db.tgRole.create(data);


    return newObject;
  },
  async tg_role_edit(parent, { id, data }, context, info) {
    const tgRole = await db.tgRole.findByPk(id);


    await tgRole.update(data);
    await tgRole.reload();

    return tgRole;
  },
  async tg_role_delete(parent, { id }, context, info) {
    const tgRole = await db.tgRole.findByPk(id);
    await tgRole.destroy();
    return true;
  },

};

module.exports = mutation;
