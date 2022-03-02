const db = require('../../database/models');
const Op = db.Sequelize.Op;

let type = `
type EtEducationProvider {
  id: String
  name: String
  createdAt: String
  updatedAt: String
  courseTemplates(where: EtCourseTemplateWhere): [EtCourseTemplate]
  courseTemplatesCount(where: EtCourseTemplateWhere): Int
  courses(where: EtCourseWhere): [EtCourse]
  coursesCount(where: EtCourseWhere): Int
}

type EtEducationProviderWithPagination {
  rows: [EtEducationProvider]
  pagination: EtEducationProviderPagination
}

type EtEducationProviderPagination {
  total: Int
  offset: Int
  limit: Int
}

input EtEducationProviderInput {
  name: String
}

input EtEducationProviderPaginationInput {
  offset: Int
  limit: Int
}

input EtEducationProviderWhere {
  id: String
  name: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_education_provider_get_all(where: EtEducationProviderWhere): [EtEducationProvider]
  et_education_provider_get_all_with_page(pagination: EtEducationProviderPaginationInput, where: EtEducationProviderWhere, searchBy: String): EtEducationProviderWithPagination
  et_education_provider_get_by_id(id: String): EtEducationProvider
`;

let mutation = `
  et_education_provider_add(data: EtEducationProviderInput): EtEducationProvider
  et_education_provider_edit(id: String, data: EtEducationProviderInput): EtEducationProvider
  et_education_provider_delete(id: String): Boolean
`;

module.exports = {
  type,
  query,
  mutation,
}