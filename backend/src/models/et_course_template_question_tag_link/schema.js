const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtCourseTemplateQuestionTagLink {
  id: String
  questionId: String
  questionTagId: String
  createdAt: String
  updatedAt: String
  tag: EtCourseTemplateQuestionTag
  question: EtCourseTemplateQuestionMcq
}

type EtCourseTemplateQuestionTagLinkWithPagination {
  rows: [EtCourseTemplateQuestionTagLink]
  pagination: EtCourseTemplateQuestionTagLinkPagination
}

type EtCourseTemplateQuestionTagLinkPagination {
  total: Int
  offset: Int
  limit: Int
}

input EtCourseTemplateQuestionTagLinkInput {
  questionId: String
  questionTagId: String
}

input EtCourseTemplateQuestionTagLinkPaginationInput {
  offset: Int
  limit: Int
}

input EtCourseTemplateQuestionTagLinkWhere {
  id: String
  questionId: String
  questionTagId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_course_template_question_tag_link_get_all(where: EtCourseTemplateQuestionTagLinkWhere): [EtCourseTemplateQuestionTagLink]
  et_course_template_question_tag_link_get_all_with_page(pagination: EtCourseTemplateQuestionTagLinkPaginationInput, where: EtCourseTemplateQuestionTagLinkWhere): EtCourseTemplateQuestionTagLinkWithPagination
  et_course_template_question_tag_link_get_by_id(id: String): EtCourseTemplateQuestionTagLink
`;

let mutation = `
  et_course_template_question_tag_link_add(data: EtCourseTemplateQuestionTagLinkInput): EtCourseTemplateQuestionTagLink
  et_course_template_question_tag_link_edit(id: String, data: EtCourseTemplateQuestionTagLinkInput): EtCourseTemplateQuestionTagLink
  et_course_template_question_tag_link_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}