let db = require('../../database/models');

let mutation = {
  async tg_user_token_add(parent, { data }, context, info) {
    return db.tgUserToken.create(data);
  },
  async tg_user_token_edit(parent, { id, data }, context, info) {
    const tgUserToken = await db.tgUserToken.findByPk(id);
    await tgUserToken.update(data);
    await tgUserToken.reload();

    return tgUserToken;
  },
  async tg_user_token_delete(parent, { id }, context, info) {
    const tgUserToken = await db.tgUserToken.findByPk(id);
    await tgUserToken.destroy();
    return true;
  },

};

module.exports = mutation;
