const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type TgPermission {
  id: String
  name: String
  description: String
  groupId: String
  createdAt: String
  updatedAt: String
  group: TgPermissionGroup
  roles: [TgRole]
  rolesCount: Int
  rolesLink: [TgRolePermission]
}

type TgPermissionWithPagination {
  rows: [TgPermission]
  pagination: TgPermissionPagination
}

type TgPermissionPagination {
  total: Int
  offset: Int
  limit: Int
}

input TgPermissionInput {
  name: String
  description: String
  groupId: String
  roles: [String]
}

input TgPermissionPaginationInput {
  offset: Int
  limit: Int
}

input TgPermissionWhere {
  id: String
  name: String
  description: String
  groupId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  tg_permission_get_all(where: TgPermissionWhere): [TgPermission]
  tg_permission_get_all_with_page(pagination: TgPermissionPaginationInput, where: TgPermissionWhere): TgPermissionWithPagination
  tg_permission_get_by_id(id: String): TgPermission
`;

let mutation = `
  tg_permission_add(data: TgPermissionInput): TgPermission
  tg_permission_edit(id: String, data: TgPermissionInput): TgPermission
  tg_permission_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}