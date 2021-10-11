const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtCourseTemplateQuestionSource {
  id: String
  name: String
  courseTemplateId: String
  createdAt: String
  updatedAt: String
  questions: [EtCourseTemplateQuestionMcq]
  questionsCount: Int
}

type EtCourseTemplateQuestionSourceWithPagination {
  rows: [EtCourseTemplateQuestionSource]
  pagination: EtCourseTemplateQuestionSourcePagination
}

type EtCourseTemplateQuestionSourcePagination {
  total: Int
  offset: Int
  limit: Int
}

input EtCourseTemplateQuestionSourceInput {
  name: String
  courseTemplateId: String
}

input EtCourseTemplateQuestionSourcePaginationInput {
  offset: Int
  limit: Int
}

input EtCourseTemplateQuestionSourceWhere {
  id: String
  name: String
  courseTemplateId: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_course_template_question_source_get_all(where: EtCourseTemplateQuestionSourceWhere): [EtCourseTemplateQuestionSource]
  et_course_template_question_source_get_all_with_page(pagination: EtCourseTemplateQuestionSourcePaginationInput, where: EtCourseTemplateQuestionSourceWhere): EtCourseTemplateQuestionSourceWithPagination
  et_course_template_question_source_get_by_id(id: String): EtCourseTemplateQuestionSource
`;

let mutation = `
  et_course_template_question_source_add(data: EtCourseTemplateQuestionSourceInput): EtCourseTemplateQuestionSource
  et_course_template_question_source_edit(id: String, data: EtCourseTemplateQuestionSourceInput): EtCourseTemplateQuestionSource
  et_course_template_question_source_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}