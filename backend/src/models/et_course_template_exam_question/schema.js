const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtCourseTemplateExamQuestion {
  id: String
  examId: String
  questionId: String
  order: String
  createdAt: String
  updatedAt: String
  question: EtCourseTemplateQuestionMcq
}

type EtCourseTemplateExamQuestionWithPagination {
  rows: [EtCourseTemplateExamQuestion]
  pagination: EtCourseTemplateExamQuestionPagination
}

type EtCourseTemplateExamQuestionPagination {
  total: Int
  offset: Int
  limit: Int
}

input EtCourseTemplateExamQuestionInput {
  examId: String
  questionId: String
  order: String
}

input EtCourseTemplateExamQuestionPaginationInput {
  offset: Int
  limit: Int
}

input EtCourseTemplateExamQuestionWhere {
  id: String
  examId: String
  questionId: String
  order: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_course_template_exam_question_get_all(where: EtCourseTemplateExamQuestionWhere): [EtCourseTemplateExamQuestion]
  et_course_template_exam_question_get_all_with_page(pagination: EtCourseTemplateExamQuestionPaginationInput, where: EtCourseTemplateExamQuestionWhere): EtCourseTemplateExamQuestionWithPagination
  et_course_template_exam_question_get_by_id(id: String): EtCourseTemplateExamQuestion
`;

let mutation = `
  et_course_template_exam_question_add(data: EtCourseTemplateExamQuestionInput): EtCourseTemplateExamQuestion
  et_course_template_exam_question_edit(id: String, data: EtCourseTemplateExamQuestionInput): EtCourseTemplateExamQuestion
  et_course_template_exam_question_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}