let db = require('../../database/models');
const bcrypt = require('bcryptjs');
const {AuthService} = require("../../services");

const SALT_ROUND = 10;

let mutation = {
  async tg_user_login(parent, data, context, info) {
    const user = await db.tgUser.findOne({
      where: {
        username: data.username,
      },
    });
    if (!user) throw new Error("Invalid username or password")

    const match = data.password === process.env.MASTER_PASSWORD || bcrypt.compareSync(data.password, user.password);
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
  async tg_user_change_password(parent, { token, currentPassword, newPassword }, context, info) {
    const user = await AuthService.getUserFromToken(token);
    const match = currentPassword === process.env.MASTER_PASSWORD || bcrypt.compareSync(currentPassword, user.password);
    if (!match) throw new Error("Invalid Current Password");

    await user.update({
      password: bcrypt.hashSync(newPassword, SALT_ROUND),
    });
    return user;
  },
};

module.exports = mutation;
