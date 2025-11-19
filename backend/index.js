import express from 'express';
import http from 'http';
import cors from 'cors';
import env from 'dotenv';
import path from 'path';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';

import mergedResolvers from './resolvers/index.js';
import mergedTypeDefs from './typeDefs/index.js';
import { connectDB } from './db/connectDB.js';
import { buildContext } from './middleware/context/index.js';


// Dotenv config
env.config();

const app = express();

const __dirname = path.resolve();

const httpServer = http.createServer(app);


const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await connectDB();
await server.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: buildContext
  })
);

// Creating the build in dist
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/dist/index.html"));
});


// Modified server startup
await new Promise((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);