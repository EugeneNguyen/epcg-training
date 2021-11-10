let db = require('../../database/models');

let mutation = {
  async tg_user_role_add(parent, { data }, context, info) {
    const newObject = await db.tgUserRole.create(data);


    return newObject;
  },
  async tg_user_role_edit(parent, { id, data }, context, info) {
    const tgUserRole = await db.tgUserRole.findByPk(id);


    await tgUserRole.update(data);
    await tgUserRole.reload();

    return tgUserRole;
  },
  async tg_user_role_delete(parent, { id }, context, info) {
    const tgUserRole = await db.tgUserRole.findByPk(id);
    await tgUserRole.destroy();
    return true;
  },

};

module.exports = mutation;
