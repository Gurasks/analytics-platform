import axios from "axios";
import { GraphQLError } from "graphql";
import { getEventsSchema, trackEventSchema } from "@analytics/shared-types";
import { config } from "../../../config";

export const eventResolvers = {
  Mutation: {
    trackEvent: async (_: any, { input }) => {
      let parsed;
      try {
        parsed = trackEventSchema.parse(input);
      } catch (error) {
        throw new GraphQLError("Invalid input", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      try {
        await axios.post(`${config.eventServiceUrl}/events`, parsed);
      } catch (error: unknown) {
        console.error("❌ [gateway] failed to fetch events:", error);

        throw new GraphQLError("Failed to fetch events", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }

      return { success: true };
    },
  },
  Query: {
    events: async (_: unknown, { input }) => {
      let parsed;
      try {
        parsed = getEventsSchema.parse(input ?? {});
      } catch (error) {
        throw new GraphQLError("Invalid query parameters", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      try {
        const response = await axios.get(`${config.eventServiceUrl}/events`, {
          params: parsed,
        });

        return response.data;
      } catch (error: unknown) {
        console.error("❌ [gateway] failed to fetch events:", error);

        throw new GraphQLError("Failed to fetch events", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },
};
