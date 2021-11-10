const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type TgUserPermission {
  id: String
  userId: String
  permissionId: String
  createdAt: String
  updatedAt: String
}

type TgUserPermissionWithPagination {
  rows: [TgUserPermission]
  pagination: TgUserPermissionPagination
}

type TgUserPermissionPagination {
  total: Int
  offset: Int
  limit: Int
}

input TgUserPermissionInput {
  userId: String
  permissionId: String
}

input TgUserPermissionPaginationInput {
  offset: Int
  limit: Int
}

input TgUserPermissionWhere {
  id: String
  userId: String
  permissionId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  tg_user_permission_get_all(where: TgUserPermissionWhere): [TgUserPermission]
  tg_user_permission_get_all_with_page(pagination: TgUserPermissionPaginationInput, where: TgUserPermissionWhere): TgUserPermissionWithPagination
  tg_user_permission_get_by_id(id: String): TgUserPermission
`;

let mutation = `
  tg_user_permission_add(data: TgUserPermissionInput): TgUserPermission
  tg_user_permission_edit(id: String, data: TgUserPermissionInput): TgUserPermission
  tg_user_permission_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}