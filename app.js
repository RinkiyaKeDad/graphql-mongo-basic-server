const express = require('express');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const graphqlSchema = require('./graphql/schema');
require('dotenv').config();

const graphqlResolvers = require('./graphql/resolvers');

const app = express();

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);
const dbPath = process.env.MONGODB_CONNECTION_STRING; // Add MongoDB Path HERE.

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(dbPath, options)
  .then(() => app.listen(3000, console.log('Server is running')))
  .catch(error => {
    throw error;
  });

// We import the schema and resolvers created earlier and to use them, we need graphqlHttp (name it whatever you want).
// It's a method provided by express-graphql that expects some options.
// Here, it receives the schema and the resolver, we also enabled graphiql which is a cool tool for testing queries.
