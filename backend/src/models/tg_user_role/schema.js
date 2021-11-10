const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type TgUserRole {
  id: String
  userId: String
  roleId: String
  createdAt: String
  updatedAt: String
}

type TgUserRoleWithPagination {
  rows: [TgUserRole]
  pagination: TgUserRolePagination
}

type TgUserRolePagination {
  total: Int
  offset: Int
  limit: Int
}

input TgUserRoleInput {
  userId: String
  roleId: String
}

input TgUserRolePaginationInput {
  offset: Int
  limit: Int
}

input TgUserRoleWhere {
  id: String
  userId: String
  roleId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  tg_user_role_get_all(where: TgUserRoleWhere): [TgUserRole]
  tg_user_role_get_all_with_page(pagination: TgUserRolePaginationInput, where: TgUserRoleWhere): TgUserRoleWithPagination
  tg_user_role_get_by_id(id: String): TgUserRole
`;

let mutation = `
  tg_user_role_add(data: TgUserRoleInput): TgUserRole
  tg_user_role_edit(id: String, data: TgUserRoleInput): TgUserRole
  tg_user_role_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}