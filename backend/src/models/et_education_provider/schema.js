let type = `
type EtEducationProvider {
  id: String
  name: String
  createdAt: String
  updatedAt: String
}

input EtEducationProviderInput {
  name: String
}
`;

let query = `
  et_education_provider_get_all: [EtEducationProvider]
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