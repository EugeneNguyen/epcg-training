const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

let models = [];

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file !== basename) && (file.slice(-3) !== '.js');
  })
  .forEach(file => {
    models.push(require(path.join(__dirname, file)))
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
  resolvers.Query = Object.assign(resolvers.Query, model.query);
  resolvers.Mutation = Object.assign(resolvers.Mutation, model.mutation);
  typeDefsObject.type += model.schema.type;
  typeDefsObject.query += model.schema.query;
  typeDefsObject.mutation += model.schema.mutation;
  resolvers = Object.assign(resolvers, model.type);
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