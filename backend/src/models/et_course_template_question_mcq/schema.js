const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtCourseTemplateQuestionMcq {
  id: String
  questionCode: String
  question: String
  answerA: String
  answerB: String
  answerC: String
  answerD: String
  correctAnswer: String
  explanation: String
  courseTemplateId: String
  questionSourceId: String
  createdAt: String
  updatedAt: String
  questionSource: EtCourseTemplateQuestionSource
  courseTemplate: EtCourseTemplate
  tags(where: EtCourseTemplateQuestionTagWhere): [EtCourseTemplateQuestionTag]
  tagsCount(where: EtCourseTemplateQuestionTagWhere): Int
  tagsLink(where: EtCourseTemplateQuestionTagLinkWhere): [EtCourseTemplateQuestionTagLink]
}

type EtCourseTemplateQuestionMcqWithPagination {
  rows: [EtCourseTemplateQuestionMcq]
  pagination: EtCourseTemplateQuestionMcqPagination
}

type EtCourseTemplateQuestionMcqPagination {
  total: Int
  offset: Int
  limit: Int
}

input EtCourseTemplateQuestionMcqInput {
  questionCode: String
  question: String
  answerA: String
  answerB: String
  answerC: String
  answerD: String
  correctAnswer: String
  explanation: String
  courseTemplateId: String
  questionSourceId: String
  tags: [String]
}

input EtCourseTemplateQuestionMcqPaginationInput {
  offset: Int
  limit: Int
}

input EtCourseTemplateQuestionMcqWhere {
  id: String
  questionCode: String
  question: String
  answerA: String
  answerB: String
  answerC: String
  answerD: String
  correctAnswer: String
  explanation: String
  courseTemplateId: String
  questionSourceId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_course_template_question_mcq_get_all(where: EtCourseTemplateQuestionMcqWhere): [EtCourseTemplateQuestionMcq]
  et_course_template_question_mcq_get_all_with_page(pagination: EtCourseTemplateQuestionMcqPaginationInput, where: EtCourseTemplateQuestionMcqWhere, searchBy: String): EtCourseTemplateQuestionMcqWithPagination
  et_course_template_question_mcq_get_by_id(id: String): EtCourseTemplateQuestionMcq
`;

let mutation = `
  et_course_template_question_mcq_add(data: EtCourseTemplateQuestionMcqInput): EtCourseTemplateQuestionMcq
  et_course_template_question_mcq_edit(id: String, data: EtCourseTemplateQuestionMcqInput): EtCourseTemplateQuestionMcq
  et_course_template_question_mcq_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}