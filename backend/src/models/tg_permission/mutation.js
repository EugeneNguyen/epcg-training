let db = require('../../database/models');

let mutation = {
  async tg_permission_add(parent, { data }, context, info) {
    const newObject = await db.tgPermission.create(data);


    return newObject;
  },
  async tg_permission_edit(parent, { id, data }, context, info) {
    const tgPermission = await db.tgPermission.findByPk(id);


    await tgPermission.update(data);
    await tgPermission.reload();

    return tgPermission;
  },
  async tg_permission_delete(parent, { id }, context, info) {
    const tgPermission = await db.tgPermission.findByPk(id);
    await tgPermission.destroy();
    return true;
  },

};

module.exports = mutation;
