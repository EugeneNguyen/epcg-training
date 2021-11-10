const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type TgUser {
  id: String
  username: String
  password: String
  createdAt: String
  updatedAt: String
}

type TgUserWithPagination {
  rows: [TgUser]
  pagination: TgUserPagination
}

type TgUserPagination {
  total: Int
  offset: Int
  limit: Int
}

input TgUserInput {
  username: String
  password: String
}

input TgUserPaginationInput {
  offset: Int
  limit: Int
}

input TgUserWhere {
  id: String
  username: String
  password: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  tg_user_get_all(where: TgUserWhere): [TgUser]
  tg_user_get_all_with_page(pagination: TgUserPaginationInput, where: TgUserWhere): TgUserWithPagination
  tg_user_get_by_id(id: String): TgUser
`;

let mutation = `
  tg_user_add(data: TgUserInput): TgUser
  tg_user_edit(id: String, data: TgUserInput): TgUser
  tg_user_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}