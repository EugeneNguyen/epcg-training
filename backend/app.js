const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const multer  = require('multer');

const upload = multer();
const models = require('./src');
const services = require('./src/services');

const env = process.env.NODE_ENV || 'development';
const ApolloServerPluginLandingPageDisabled = require("apollo-server-core").ApolloServerPluginLandingPageDisabled;

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  ...models,
  plugins: [
    ...(env !== 'development' ? [ApolloServerPluginLandingPageDisabled()] : []),
  ],
});

server.start().then(() => {
  const app = express();
  app.use('/admin', express.static('public/admin'));
  app.use('/', express.static('public/app'));
  app.post('/upload', upload.single('file'), async (req, res, next) => {
    const uploadedFile = await services.FileService.upload(req.file);
    const data = await services.FileService.getUrl(uploadedFile.Key);
    res.send(data);
  })

  server.applyMiddleware({app, path: '/api'});

  app.listen({port}, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    console.log(`🚀 Admin ready at http://localhost:${port}/admin`);
    console.log(`🚀 App ready at http://localhost:${port}/`);
  });
})
