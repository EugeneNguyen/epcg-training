const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtCourseTemplateExam {
  id: String
  name: String
  duration: Int
  numberOfQuestion: Int
  unlimitedTime: Boolean
  randomQuestionOrder: Boolean
  randomChoiceOrder: Boolean
  isPublic: Boolean
  courseTemplateId: String
  createdAt: String
  updatedAt: String
  courseTemplate: EtCourseTemplate
  questions(where: EtCourseTemplateQuestionMcqWhere): [EtCourseTemplateQuestionMcq]
  questionsCount(where: EtCourseTemplateQuestionMcqWhere): Int
  questionsLink(where: EtCourseTemplateExamQuestionWhere): [EtCourseTemplateExamQuestion]
  attempts(where: EtExamAttemptWhere): [EtExamAttempt]
  attemptsCount(where: EtExamAttemptWhere): Int
}

type EtCourseTemplateExamWithPagination {
  rows: [EtCourseTemplateExam]
  pagination: EtCourseTemplateExamPagination
}

type EtCourseTemplateExamPagination {
  total: Int
  offset: Int
  limit: Int
}

input EtCourseTemplateExamInput {
  name: String
  duration: Int
  numberOfQuestion: Int
  unlimitedTime: Boolean
  randomQuestionOrder: Boolean
  randomChoiceOrder: Boolean
  isPublic: Boolean
  courseTemplateId: String
  questions: [String]
}

input EtCourseTemplateExamPaginationInput {
  offset: Int
  limit: Int
}

input EtCourseTemplateExamWhere {
  id: String
  name: String
  duration: Int
  numberOfQuestion: Int
  unlimitedTime: Boolean
  randomQuestionOrder: Boolean
  randomChoiceOrder: Boolean
  isPublic: Boolean
  courseTemplateId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_course_template_exam_get_all(where: EtCourseTemplateExamWhere): [EtCourseTemplateExam]
  et_course_template_exam_get_all_with_page(pagination: EtCourseTemplateExamPaginationInput, where: EtCourseTemplateExamWhere): EtCourseTemplateExamWithPagination
  et_course_template_exam_get_by_id(id: String): EtCourseTemplateExam
`;

let mutation = `
  et_course_template_exam_add(data: EtCourseTemplateExamInput): EtCourseTemplateExam
  et_course_template_exam_edit(id: String, data: EtCourseTemplateExamInput): EtCourseTemplateExam
  et_course_template_exam_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}