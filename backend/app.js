const { ApolloServer } = require('apollo-server-express');
const models = require('./src/models');
const express = require('express');

const port = process.env.PORT || 4000;

const server = new ApolloServer(models);
server.start().then(() => {
  const app = express();
  app.use('/admin', express.static('public/admin'))

  server.applyMiddleware({ app, path: '/api' });

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
})
