import axios from "axios";
import { config } from "../../../config";
import { EventResponse } from "./event.types";
import { GetEventsQuery, getEventsSchema } from "@analytics/shared-types";

export const eventResolvers = {
  Query: {
    events: async (_: unknown, args: GetEventsQuery) => {
      try {
        const parsed = getEventsSchema.parse(args);

        const response = await axios.get<EventResponse>(
          `${config.eventServiceUrl}/events`,
          {
            params: parsed,
          },
        );

        return response.data;
      } catch (error) {
        console.error("❌ [gateway] failed to fetch events:", error);

        throw new Error("Failed to fetch events");
      }
    },
  },
};
