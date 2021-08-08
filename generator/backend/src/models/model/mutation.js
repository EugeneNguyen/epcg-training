const services = require('../../services');

let mutation = {
  async model_fetch(parent, args, context, info) {
    await services.model.fetch();
    return [];
  },
  async model_clear(parent, args, context, info) {
    services.model.clear()
    return [];
  },
  async model_info(parent, {model}, context, info) {
    await services.model.info(model);
    return [];
  },
  async model_consolidate(parent, {model}, context, info) {
    services.model.consolidate(model);
  },
  async model_generate_frontend(parent, {model}, context, info) {
    services.generator.frontend(model);
  },
  async model_generate_graphql(parent, {model}, context, info) {
    services.generator.graphql(model);
  },
};

module.exports = mutation;
