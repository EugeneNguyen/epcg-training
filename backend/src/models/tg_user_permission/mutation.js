let db = require('../../database/models');

let mutation = {
  async tg_user_permission_add(parent, { data }, context, info) {
    const newObject = await db.tgUserPermission.create(data);


    return newObject;
  },
  async tg_user_permission_edit(parent, { id, data }, context, info) {
    const tgUserPermission = await db.tgUserPermission.findByPk(id);


    await tgUserPermission.update(data);
    await tgUserPermission.reload();

    return tgUserPermission;
  },
  async tg_user_permission_delete(parent, { id }, context, info) {
    const tgUserPermission = await db.tgUserPermission.findByPk(id);
    await tgUserPermission.destroy();
    return true;
  },

};

module.exports = mutation;
