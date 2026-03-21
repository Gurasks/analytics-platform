import { baseSchema } from "./schema";
import { eventModule } from "./modules/event";

export const typeDefs = [baseSchema.typeDefs, eventModule.typeDefs];

export const resolvers = [eventModule.resolvers];
