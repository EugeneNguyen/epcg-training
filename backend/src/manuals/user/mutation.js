let db = require('../../database/models');
const bcrypt = require('bcrypt');

const SALT_ROUND = 10;

let mutation = {
  async z_user_login(parent, data, context, info) {
    const user = await db.tgUser.findOne({
      where: {
        username: data.username,
      },
    });
    if (!user) throw new Error("Invalid username or password")

    const match = bcrypt.compareSync(data.password, user.password);
    if (match) {
      const token = await db.tgUserToken.create({userId: user.id});
      return token.id;
    } else {
      throw new Error("Invalid username or password");
    }
  },
  async tg_user_add(parent, { data }, context, info) {
    return db.tgUser.create({
      ...data,
      password: bcrypt.hashSync(data.password, SALT_ROUND),
    });
  },
};

module.exports = mutation;
