import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs, resolvers } from "./graphql";
import { config } from "./config";

async function start() {
  console.log("🗄️ [gateway] connected to MongoDB");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError) => {
      return {
        message: formattedError.message,
        code: formattedError.extensions?.code,
      };
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: config.port },
  });

  console.log(`🚀 [gateway] → ${url}`);
}

start();
