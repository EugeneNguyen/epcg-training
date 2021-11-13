const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtCourse {
  id: String
  name: String
  educationProviderId: String
  courseTemplateId: String
  isPrivateCourse: Boolean
  createdAt: String
  updatedAt: String
  courseTemplate: EtCourseTemplate
  educationProvider: EtEducationProvider
  enrolls: [EtCourseEnroll]
  enrollsCount: Int
  exams: [EtCourseExam]
  examsCount: Int
}

type EtCourseWithPagination {
  rows: [EtCourse]
  pagination: EtCoursePagination
}

type EtCoursePagination {
  total: Int
  offset: Int
  limit: Int
}

input EtCourseInput {
  name: String
  educationProviderId: String
  courseTemplateId: String
  isPrivateCourse: Boolean
}

input EtCoursePaginationInput {
  offset: Int
  limit: Int
}

input EtCourseWhere {
  id: String
  name: String
  educationProviderId: String
  courseTemplateId: String
  isPrivateCourse: Boolean
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_course_get_all(where: EtCourseWhere): [EtCourse]
  et_course_get_all_with_page(pagination: EtCoursePaginationInput, where: EtCourseWhere): EtCourseWithPagination
  et_course_get_by_id(id: String): EtCourse
`;

let mutation = `
  et_course_add(data: EtCourseInput): EtCourse
  et_course_edit(id: String, data: EtCourseInput): EtCourse
  et_course_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}