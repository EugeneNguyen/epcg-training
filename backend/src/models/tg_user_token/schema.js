const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type TgUserToken {
  id: String
  userId: String
  createdAt: String
  updatedAt: String
}

type TgUserTokenWithPagination {
  rows: [TgUserToken]
  pagination: TgUserTokenPagination
}

type TgUserTokenPagination {
  total: Int
  offset: Int
  limit: Int
}

input TgUserTokenInput {
  userId: String
  createdAt: String
  updatedAt: String
}

input TgUserTokenPaginationInput {
  offset: Int
  limit: Int
}

input TgUserTokenWhere {
  id: String
  userId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  tg_user_token_get_all(where: TgUserTokenWhere): [TgUserToken]
  tg_user_token_get_all_with_page(pagination: TgUserTokenPaginationInput, where: TgUserTokenWhere): TgUserTokenWithPagination
  tg_user_token_get_by_id(id: String): TgUserToken
`;

let mutation = `
  tg_user_token_add(data: TgUserTokenInput): TgUserToken
  tg_user_token_edit(id: String, data: TgUserTokenInput): TgUserToken
  tg_user_token_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}