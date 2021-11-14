let db = require('../../database/models');

let mutation = {
  async tg_user_add(parent, { data }, context, info) {
    const newObject = await db.tgUser.create(data);

    const permissionsIds = data.permissions;
    for (const permissionsId of permissionsIds) {
      await db.tgUserPermission.create({
        userId: newObject.id,
        permissionId: permissionsId,
      });
    }
    const rolesIds = data.roles;
    for (const rolesId of rolesIds) {
      await db.tgUserRole.create({
        userId: newObject.id,
        roleId: rolesId,
      });
    }
    const coursesIds = data.courses;
    for (const coursesId of coursesIds) {
      await db.etCourseEnroll.create({
        userId: newObject.id,
        courseId: coursesId,
      });
    }

    return newObject;
  },
  async tg_user_edit(parent, { id, data }, context, info) {
    const tgUser = await db.tgUser.findByPk(id);

    if (data.permissions) {
      const permissionsIds = data.permissions;
      const permissionsLinks = await db.tgUserPermission.findAll({
        where: {
          userId: tgUser.id
        }
      });
      const permissionsOldIds = permissionsLinks.map(link => link.permissionId);

      const addIds = permissionsIds.filter(x => !permissionsOldIds.includes(x));
      const rmvIds = permissionsOldIds.filter(x => !permissionsIds.includes(x));

      for (const addId of addIds) {
        await db.tgUserPermission.create({
          userId: id,
          permissionId: addId,
        });
      }

      for (const rmvId of rmvIds) {
        await db.tgUserPermission.destroy({
          where: {
            userId: id,
            permissionId: rmvId,
          }
        });
      }
    }
    if (data.roles) {
      const rolesIds = data.roles;
      const rolesLinks = await db.tgUserRole.findAll({
        where: {
          userId: tgUser.id
        }
      });
      const rolesOldIds = rolesLinks.map(link => link.roleId);

      const addIds = rolesIds.filter(x => !rolesOldIds.includes(x));
      const rmvIds = rolesOldIds.filter(x => !rolesIds.includes(x));

      for (const addId of addIds) {
        await db.tgUserRole.create({
          userId: id,
          roleId: addId,
        });
      }

      for (const rmvId of rmvIds) {
        await db.tgUserRole.destroy({
          where: {
            userId: id,
            roleId: rmvId,
          }
        });
      }
    }
    if (data.courses) {
      const coursesIds = data.courses;
      const coursesLinks = await db.etCourseEnroll.findAll({
        where: {
          userId: tgUser.id
        }
      });
      const coursesOldIds = coursesLinks.map(link => link.courseId);

      const addIds = coursesIds.filter(x => !coursesOldIds.includes(x));
      const rmvIds = coursesOldIds.filter(x => !coursesIds.includes(x));

      for (const addId of addIds) {
        await db.etCourseEnroll.create({
          userId: id,
          courseId: addId,
        });
      }

      for (const rmvId of rmvIds) {
        await db.etCourseEnroll.destroy({
          where: {
            userId: id,
            courseId: rmvId,
          }
        });
      }
    }

    await tgUser.update(data);
    await tgUser.reload();

    return tgUser;
  },
  async tg_user_delete(parent, { id }, context, info) {
    const tgUser = await db.tgUser.findByPk(id);
    await tgUser.destroy();
    return true;
  },

};

module.exports = mutation;
