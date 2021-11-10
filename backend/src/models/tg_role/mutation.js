let db = require('../../database/models');

let mutation = {
  async tg_role_add(parent, { data }, context, info) {
    const newObject = await db.tgRole.create(data);

    const membersIds = data.members;
    for (const membersId of membersIds) {
      await db.tgUserRole.create({
        roleId: newObject.id,
        userId: membersId,
      });
    }
    const permissionIds = data.permission;
    for (const permissionId of permissionIds) {
      await db.tgRolePermission.create({
        roleId: newObject.id,
        permissionId: permissionId,
      });
    }

    return newObject;
  },
  async tg_role_edit(parent, { id, data }, context, info) {
    const tgRole = await db.tgRole.findByPk(id);

    if (data.members) {
      const membersIds = data.members;
      const membersLinks = await db.tgUserRole.findAll({
        where: {
          roleId: tgRole.id
        }
      });
      const membersOldIds = membersLinks.map(link => link.userId);

      const addIds = membersIds.filter(x => !membersOldIds.includes(x));
      const rmvIds = membersOldIds.filter(x => !membersIds.includes(x));

      for (const addId of addIds) {
        await db.tgUserRole.create({
          roleId: id,
          userId: addId,
        });
      }

      for (const rmvId of rmvIds) {
        await db.tgUserRole.destroy({
          where: {
            roleId: id,
            userId: rmvId,
          }
        });
      }
    }
    if (data.permission) {
      const permissionIds = data.permission;
      const permissionLinks = await db.tgRolePermission.findAll({
        where: {
          roleId: tgRole.id
        }
      });
      const permissionOldIds = permissionLinks.map(link => link.permissionId);

      const addIds = permissionIds.filter(x => !permissionOldIds.includes(x));
      const rmvIds = permissionOldIds.filter(x => !permissionIds.includes(x));

      for (const addId of addIds) {
        await db.tgRolePermission.create({
          roleId: id,
          permissionId: addId,
        });
      }

      for (const rmvId of rmvIds) {
        await db.tgRolePermission.destroy({
          where: {
            roleId: id,
            permissionId: rmvId,
          }
        });
      }
    }

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
