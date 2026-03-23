import { analyticsResolvers } from "./analytics.resolver";
import { analyticsTypeDefs } from "./analytics.schema";

export const analyticsModule = {
  typeDefs: analyticsTypeDefs,
  resolvers: analyticsResolvers,
};
