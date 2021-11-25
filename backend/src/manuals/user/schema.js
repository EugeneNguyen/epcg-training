const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
`;

let query = `
  me(token: String): TgUser
`;

let mutation = `
  tg_user_login(username: String, password: String): String
  tg_user_change_password(token: String, currentPassword: String, newPassword: String): TgUser
`;

module.exports = {
  type,
  query,
  mutation,
}