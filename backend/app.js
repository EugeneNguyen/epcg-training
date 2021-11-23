const { ApolloServer } = require('apollo-server-express');
const models = require('./src');
const express = require('express');
const ApolloServerPluginLandingPageDisabled = require("apollo-server-core").ApolloServerPluginLandingPageDisabled;

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  ...models,
  plugins: [
    ApolloServerPluginLandingPageDisabled(),
  ],
});

server.start().then(() => {
  const app = express();
  app.use('/admin', express.static('public/admin'));
  app.use('/', express.static('public/app'));

  server.applyMiddleware({ app, path: '/api' });

  app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    console.log(`🚀 Admin ready at http://localhost:${port}/admin`);
    console.log(`🚀 App ready at http://localhost:${port}/`);
  });
})
