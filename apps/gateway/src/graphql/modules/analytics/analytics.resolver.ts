import axios from "axios";
import { GraphQLError } from "graphql";
import { eventStatSchema } from "@analytics/shared-types";
import { config } from "../../../config";

export const analyticsResolvers = {
  Query: {
    eventStats: async (_: any, { input }) => {
      let parsed;

      try {
        parsed = eventStatSchema.parse(input);
      } catch {
        throw new GraphQLError("Invalid input", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      try {
        const response = await axios.post(
          `${config.analyticsServiceUrl}/stats`,
          parsed,
        );

        return response.data;
      } catch (error) {
        console.error("❌ [gateway] failed to fetch analytics:", error);

        throw new GraphQLError("Failed to fetch analytics", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },
};
