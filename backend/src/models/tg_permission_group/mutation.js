let db = require('../../database/models');

let mutation = {
  async tg_permission_group_add(parent, { data }, context, info) {
    const newObject = await db.tgPermissionGroup.create(data);


    return newObject;
  },
  async tg_permission_group_edit(parent, { id, data }, context, info) {
    const tgPermissionGroup = await db.tgPermissionGroup.findByPk(id);


    await tgPermissionGroup.update(data);
    await tgPermissionGroup.reload();

    return tgPermissionGroup;
  },
  async tg_permission_group_delete(parent, { id }, context, info) {
    const tgPermissionGroup = await db.tgPermissionGroup.findByPk(id);
    await tgPermissionGroup.destroy();
    return true;
  },

};

module.exports = mutation;
