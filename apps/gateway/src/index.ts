import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

// 1. Schema
const typeDefs = `
  type Query {
    hello: String
  }
`;

// 2. Resolvers
const resolvers = {
  Query: {
    hello: () => "Hello from Apollo v5 Gateway",
  },
};

// 3. Create server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function start() {
  await server.start();

  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/graphql", expressMiddleware(server));

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`🚀 [gateway] running → http://localhost:${PORT}/graphql`);
  });
}

start();
