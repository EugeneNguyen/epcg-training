let db = require('../../database/models');

let mutation = {
  async tg_user_add(parent, { data }, context, info) {
    const newObject = await db.tgUser.create(data);


    return newObject;
  },
  async tg_user_edit(parent, { id, data }, context, info) {
    const tgUser = await db.tgUser.findByPk(id);


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
