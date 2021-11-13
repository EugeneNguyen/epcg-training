const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtCourseEnroll {
  id: String
  courseId: String
  userId: String
  isActive: Boolean
  createdAt: String
  updatedAt: String
  course: EtCourse
  user: TgUser
}

type EtCourseEnrollWithPagination {
  rows: [EtCourseEnroll]
  pagination: EtCourseEnrollPagination
}

type EtCourseEnrollPagination {
  total: Int
  offset: Int
  limit: Int
}

input EtCourseEnrollInput {
  courseId: String
  userId: String
  isActive: Boolean
}

input EtCourseEnrollPaginationInput {
  offset: Int
  limit: Int
}

input EtCourseEnrollWhere {
  id: String
  courseId: String
  userId: String
  isActive: Boolean
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_course_enroll_get_all(where: EtCourseEnrollWhere): [EtCourseEnroll]
  et_course_enroll_get_all_with_page(pagination: EtCourseEnrollPaginationInput, where: EtCourseEnrollWhere): EtCourseEnrollWithPagination
  et_course_enroll_get_by_id(id: String): EtCourseEnroll
`;

let mutation = `
  et_course_enroll_add(data: EtCourseEnrollInput): EtCourseEnroll
  et_course_enroll_edit(id: String, data: EtCourseEnrollInput): EtCourseEnroll
  et_course_enroll_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}