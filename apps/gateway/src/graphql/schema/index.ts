import { eventResolvers } from "../modules/event/event.resolver";
import { eventTypeDefs } from "../modules/event/event.schema";
import { baseTypeDefs } from "./base.schema";

export const typeDefs = [baseTypeDefs, eventTypeDefs];

export const resolvers = [eventResolvers];
