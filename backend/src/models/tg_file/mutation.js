let db = require('../../database/models');

let mutation = {
  async tg_file_add(parent, { data }, context, info) {
    const newObject = await db.tgFile.create(data);


    return newObject;
  },
  async tg_file_edit(parent, { id, data }, context, info) {
    const tgFile = await db.tgFile.findByPk(id);


    await tgFile.update(data);
    await tgFile.reload();

    return tgFile;
  },
  async tg_file_delete(parent, { id }, context, info) {
    const tgFile = await db.tgFile.findByPk(id);
    await tgFile.destroy();
    return true;
  },

};

module.exports = mutation;
