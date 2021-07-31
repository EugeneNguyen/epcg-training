let type = `
type etEducationProvider {
  id: String
  name: String
  createdAt: String
  updatedAt: String
}

input etEducationProviderInput {
  id: String
  name: String
  createdAt: String
  updatedAt: String
}
`;

let query = `
  et_education_provider_get_all: [etEducationProvider]
`;

let mutation = `
  et_education_provider_add(data: etEducationProviderInput): etEducationProvider
`;

module.exports = {
  type,
  query,
  mutation,
}