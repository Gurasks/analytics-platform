import "dotenv/config";
import express from "express";
import cors from "cors";

import { ApolloServer } from "@apollo/server";

import { typeDefs, resolvers } from "./graphql";
import { config } from "./config";
import { expressMiddleware } from "@as-integrations/express5";
import axios from "axios";

async function start() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", async (_req, res) => {
    try {
      await Promise.all([
        axios.get(`${config.eventServiceUrl}/health`),
        axios.get(`${config.analyticsServiceUrl}/health`),
      ]);

      res.json({ status: "ok", service: "gateway" });
    } catch {
      res.status(500).json({
        status: "error",
        service: "gateway",
      });
    }
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError) => ({
      message: formattedError.message,
      code: formattedError.extensions?.code,
    }),
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(config.port, () => {
    console.log(`🚀 [gateway] → http://localhost:${config.port}/graphql`);
  });
}

start();
