let type = `
type Model {
  name: String
}

input ModelInput {
  name: String
}
`;

let query = `
  model_get_all: [Model]
`;

let mutation = `
  model_fetch: [Model]
  model_clear: [Model]
  model_info(model: String): Model
  model_consolidate(model: String): Model
  model_generate_frontend(model: String): Model
  model_generate_graphql(model: String): Model
`;

module.exports = {
  type,
  query,
  mutation,
}