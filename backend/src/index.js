const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const basename = path.basename(__filename);

let models = [];

fs
  .readdirSync(path.join(__dirname, 'models'))
  .filter(file => {
    return (file !== basename) && (file.slice(-3) !== '.js');
  })
  .forEach(file => {
    models.push(require(path.join(__dirname, 'models', file)))
  });

fs
  .readdirSync(path.join(__dirname, 'manuals'))
  .filter(file => {
    return (file !== basename) && (file.slice(-3) !== '.js');
  })
  .forEach(file => {
    models.push(require(path.join(__dirname, 'manuals', file)))
  });

let resolvers = {
  Query: {},
  Mutation: {},
};

let typeDefsObject = {
  type: '',
  query: '',
  mutation: '',
}

for (const model of models) {
  resolvers.Query = _.merge(resolvers.Query, model.query);
  resolvers.Mutation = _.merge(resolvers.Mutation, model.mutation);
  typeDefsObject.type += model.schema.type;
  typeDefsObject.query += model.schema.query;
  typeDefsObject.mutation += model.schema.mutation;
  resolvers = _.merge(resolvers, model.type);
}

let typeDefs = `
${typeDefsObject.type}

type Query {
${typeDefsObject.query}
}

type Mutation {
${typeDefsObject.mutation}
}
`

module.exports = {
  typeDefs,
  resolvers
}