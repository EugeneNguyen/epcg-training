const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtCourseTemplateQuestionTag {
  id: String
  name: String
  courseTemplateId: String
  createdAt: String
  updatedAt: String
  courseTemplate: EtCourseTemplate
  questions(where: EtCourseTemplateQuestionMcqWhere): [EtCourseTemplateQuestionMcq]
  questionsCount(where: EtCourseTemplateQuestionMcqWhere): Int
  questionsLink(where: EtCourseTemplateQuestionTagLinkWhere): [EtCourseTemplateQuestionTagLink]
}

type EtCourseTemplateQuestionTagWithPagination {
  rows: [EtCourseTemplateQuestionTag]
  pagination: EtCourseTemplateQuestionTagPagination
}

type EtCourseTemplateQuestionTagPagination {
  total: Int
  offset: Int
  limit: Int
}

input EtCourseTemplateQuestionTagInput {
  name: String
  courseTemplateId: String
  questions: [String]
}

input EtCourseTemplateQuestionTagPaginationInput {
  offset: Int
  limit: Int
}

input EtCourseTemplateQuestionTagWhere {
  id: String
  name: String
  courseTemplateId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_course_template_question_tag_get_all(where: EtCourseTemplateQuestionTagWhere): [EtCourseTemplateQuestionTag]
  et_course_template_question_tag_get_all_with_page(pagination: EtCourseTemplateQuestionTagPaginationInput, where: EtCourseTemplateQuestionTagWhere): EtCourseTemplateQuestionTagWithPagination
  et_course_template_question_tag_get_by_id(id: String): EtCourseTemplateQuestionTag
`;

let mutation = `
  et_course_template_question_tag_add(data: EtCourseTemplateQuestionTagInput): EtCourseTemplateQuestionTag
  et_course_template_question_tag_edit(id: String, data: EtCourseTemplateQuestionTagInput): EtCourseTemplateQuestionTag
  et_course_template_question_tag_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}