const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtCourseExam {
  id: String
  name: String
  courseId: String
  courseTemplateExamId: String
  createdAt: String
  updatedAt: String
  course: EtCourse
  courseTemplateExam: EtCourseTemplateExam
  attempts(where: EtExamAttemptWhere): [EtExamAttempt]
  attemptsCount(where: EtExamAttemptWhere): Int
}

type EtCourseExamWithPagination {
  rows: [EtCourseExam]
  pagination: EtCourseExamPagination
}

type EtCourseExamPagination {
  total: Int
  offset: Int
  limit: Int
}

input EtCourseExamInput {
  name: String
  courseId: String
  courseTemplateExamId: String
}

input EtCourseExamPaginationInput {
  offset: Int
  limit: Int
}

input EtCourseExamWhere {
  id: String
  name: String
  courseId: String
  courseTemplateExamId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_course_exam_get_all(where: EtCourseExamWhere): [EtCourseExam]
  et_course_exam_get_all_with_page(pagination: EtCourseExamPaginationInput, where: EtCourseExamWhere): EtCourseExamWithPagination
  et_course_exam_get_by_id(id: String): EtCourseExam
`;

let mutation = `
  et_course_exam_add(data: EtCourseExamInput): EtCourseExam
  et_course_exam_edit(id: String, data: EtCourseExamInput): EtCourseExam
  et_course_exam_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}