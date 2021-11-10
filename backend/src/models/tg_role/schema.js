const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type TgRole {
  id: String
  name: String
  description: String
  createdAt: String
  updatedAt: String
  members: [TgUser]
  membersCount: Int
  membersLink: [TgUserRole]
  permission: [TgPermission]
  permissionCount: Int
  permissionLink: [TgRolePermission]
}

type TgRoleWithPagination {
  rows: [TgRole]
  pagination: TgRolePagination
}

type TgRolePagination {
  total: Int
  offset: Int
  limit: Int
}

input TgRoleInput {
  name: String
  description: String
  members: [String]
  permission: [String]
}

input TgRolePaginationInput {
  offset: Int
  limit: Int
}

input TgRoleWhere {
  id: String
  name: String
  description: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  tg_role_get_all(where: TgRoleWhere): [TgRole]
  tg_role_get_all_with_page(pagination: TgRolePaginationInput, where: TgRoleWhere): TgRoleWithPagination
  tg_role_get_by_id(id: String): TgRole
`;

let mutation = `
  tg_role_add(data: TgRoleInput): TgRole
  tg_role_edit(id: String, data: TgRoleInput): TgRole
  tg_role_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}