import axios from "axios";
import { GraphQLError } from "graphql";
import { getEventsSchema } from "@analytics/shared-types";
import { config } from "../../../config";

export const eventResolvers = {
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
