import { eventTypeDefs } from "./event.schema";
import { eventResolvers } from "./event.resolver";

export const eventModule = {
  typeDefs: eventTypeDefs,
  resolvers: eventResolvers,
};
