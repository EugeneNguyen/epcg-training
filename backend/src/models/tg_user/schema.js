const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type TgUser {
  id: String
  username: String
  password: String
  createdAt: String
  updatedAt: String
  tokens(where: TgUserTokenWhere): [TgUserToken]
  tokensCount(where: TgUserTokenWhere): Int
  permissions(where: TgPermissionWhere): [TgPermission]
  permissionsCount(where: TgPermissionWhere): Int
  permissionsLink(where: TgUserPermissionWhere): [TgUserPermission]
  roles(where: TgRoleWhere): [TgRole]
  rolesCount(where: TgRoleWhere): Int
  rolesLink(where: TgUserRoleWhere): [TgUserRole]
  courses(where: EtCourseWhere): [EtCourse]
  coursesCount(where: EtCourseWhere): Int
  coursesLink(where: EtCourseEnrollWhere): [EtCourseEnroll]
  examAttempts(where: EtExamAttemptWhere): [EtExamAttempt]
  examAttemptsCount(where: EtExamAttemptWhere): Int
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
  permissions: [String]
  roles: [String]
  courses: [String]
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
  tg_user_get_all_with_page(pagination: TgUserPaginationInput, where: TgUserWhere, searchBy: String): TgUserWithPagination
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