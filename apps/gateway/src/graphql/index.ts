import { baseTypeDefs } from "./schema/base.schema";
import { eventModule } from "./modules/event";
import { analyticsModule } from "./modules/analytics";

const modules = [eventModule, analyticsModule];

export const typeDefs = [baseTypeDefs, ...modules.map((m) => m.typeDefs)];

export const resolvers = modules.map((m) => m.resolvers);
