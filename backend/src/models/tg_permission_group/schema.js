const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type TgPermissionGroup {
  id: String
  name: String
  description: String
  createdAt: String
  updatedAt: String
  permissions: [TgPermission]
  permissionsCount: Int
}

type TgPermissionGroupWithPagination {
  rows: [TgPermissionGroup]
  pagination: TgPermissionGroupPagination
}

type TgPermissionGroupPagination {
  total: Int
  offset: Int
  limit: Int
}

input TgPermissionGroupInput {
  name: String
  description: String
}

input TgPermissionGroupPaginationInput {
  offset: Int
  limit: Int
}

input TgPermissionGroupWhere {
  id: String
  name: String
  description: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  tg_permission_group_get_all(where: TgPermissionGroupWhere): [TgPermissionGroup]
  tg_permission_group_get_all_with_page(pagination: TgPermissionGroupPaginationInput, where: TgPermissionGroupWhere): TgPermissionGroupWithPagination
  tg_permission_group_get_by_id(id: String): TgPermissionGroup
`;

let mutation = `
  tg_permission_group_add(data: TgPermissionGroupInput): TgPermissionGroup
  tg_permission_group_edit(id: String, data: TgPermissionGroupInput): TgPermissionGroup
  tg_permission_group_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}