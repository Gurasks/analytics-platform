import { baseTypeDefs } from "./schema/base.schema";
import { eventModule } from "./modules/event";

const modules = [eventModule];

export const typeDefs = [baseTypeDefs, ...modules.map((m) => m.typeDefs)];

export const resolvers = modules.map((m) => m.resolvers);
