const { ApolloServer } = require('apollo-server');
const models = require('./src/models');

const server = new ApolloServer(models);

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
