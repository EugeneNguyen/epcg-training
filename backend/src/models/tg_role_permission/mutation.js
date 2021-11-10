let db = require('../../database/models');

let mutation = {
  async tg_role_permission_add(parent, { data }, context, info) {
    const newObject = await db.tgRolePermission.create(data);


    return newObject;
  },
  async tg_role_permission_edit(parent, { id, data }, context, info) {
    const tgRolePermission = await db.tgRolePermission.findByPk(id);


    await tgRolePermission.update(data);
    await tgRolePermission.reload();

    return tgRolePermission;
  },
  async tg_role_permission_delete(parent, { id }, context, info) {
    const tgRolePermission = await db.tgRolePermission.findByPk(id);
    await tgRolePermission.destroy();
    return true;
  },

};

module.exports = mutation;
