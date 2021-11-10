const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type TgRolePermission {
  id: String
  roleId: String
  permissionId: String
  createdAt: String
  updatedAt: String
  role: TgRole
  permission: TgPermission
}

type TgRolePermissionWithPagination {
  rows: [TgRolePermission]
  pagination: TgRolePermissionPagination
}

type TgRolePermissionPagination {
  total: Int
  offset: Int
  limit: Int
}

input TgRolePermissionInput {
  roleId: String
  permissionId: String
  createdAt: String
  updatedAt: String
}

input TgRolePermissionPaginationInput {
  offset: Int
  limit: Int
}

input TgRolePermissionWhere {
  id: String
  roleId: String
  permissionId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  tg_role_permission_get_all(where: TgRolePermissionWhere): [TgRolePermission]
  tg_role_permission_get_all_with_page(pagination: TgRolePermissionPaginationInput, where: TgRolePermissionWhere): TgRolePermissionWithPagination
  tg_role_permission_get_by_id(id: String): TgRolePermission
`;

let mutation = `
  tg_role_permission_add(data: TgRolePermissionInput): TgRolePermission
  tg_role_permission_edit(id: String, data: TgRolePermissionInput): TgRolePermission
  tg_role_permission_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}