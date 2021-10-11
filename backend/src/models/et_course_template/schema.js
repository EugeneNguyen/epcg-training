const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtCourseTemplate {
  id: String
  name: String
  educationProviderId: String
  createdAt: String
  updatedAt: String
  educationProvider: EtEducationProvider
  questions: [EtCourseTemplateQuestionMcq]
  questionsCount: Int
  questionSources: [EtCourseTemplateQuestionSource]
  questionSourcesCount: Int
  tags: [EtCourseTemplateQuestionTag]
  tagsCount: Int
}

type EtCourseTemplateWithPagination {
  rows: [EtCourseTemplate]
  pagination: EtCourseTemplatePagination
}

type EtCourseTemplatePagination {
  total: Int
  offset: Int
  limit: Int
}

input EtCourseTemplateInput {
  name: String
  educationProviderId: String
}

input EtCourseTemplatePaginationInput {
  offset: Int
  limit: Int
}

input EtCourseTemplateWhere {
  id: String
  name: String
  educationProviderId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_course_template_get_all(where: EtCourseTemplateWhere): [EtCourseTemplate]
  et_course_template_get_all_with_page(pagination: EtCourseTemplatePaginationInput, where: EtCourseTemplateWhere): EtCourseTemplateWithPagination
  et_course_template_get_by_id(id: String): EtCourseTemplate
`;

let mutation = `
  et_course_template_add(data: EtCourseTemplateInput): EtCourseTemplate
  et_course_template_edit(id: String, data: EtCourseTemplateInput): EtCourseTemplate
  et_course_template_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}