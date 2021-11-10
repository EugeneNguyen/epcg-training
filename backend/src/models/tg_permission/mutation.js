let db = require('../../database/models');

let mutation = {
  async tg_permission_add(parent, { data }, context, info) {
    const newObject = await db.tgPermission.create(data);

    const rolesIds = data.roles;
    for (const rolesId of rolesIds) {
      await db.tgRolePermission.create({
        permissionId: newObject.id,
        roleId: rolesId,
      });
    }

    return newObject;
  },
  async tg_permission_edit(parent, { id, data }, context, info) {
    const tgPermission = await db.tgPermission.findByPk(id);

    if (data.roles) {
      const rolesIds = data.roles;
      const rolesLinks = await db.tgRolePermission.findAll({
        where: {
          permissionId: tgPermission.id
        }
      });
      const rolesOldIds = rolesLinks.map(link => link.roleId);

      const addIds = rolesIds.filter(x => !rolesOldIds.includes(x));
      const rmvIds = rolesOldIds.filter(x => !rolesIds.includes(x));

      for (const addId of addIds) {
        await db.tgRolePermission.create({
          permissionId: id,
          roleId: addId,
        });
      }

      for (const rmvId of rmvIds) {
        await db.tgRolePermission.destroy({
          where: {
            permissionId: id,
            roleId: rmvId,
          }
        });
      }
    }

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
