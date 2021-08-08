let type = `
type EtCourseTemplate {
  id: String
  name: String
  educationProviderId: String
  createdAt: String
  updatedAt: String
}

input EtCourseTemplateInput {
  name: String
  educationProviderId: String
}
`;

let query = `
  et_course_template_get_all: [EtCourseTemplate]
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