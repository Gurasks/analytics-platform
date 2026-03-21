import axios from "axios";
import { config } from "../../../config";

export const eventResolvers = {
  Query: {
    events: async (_, args) => {
      const response = await axios.get(`${config.eventServiceUrl}/events`, {
        params: args,
      });

      return response.data;
    },
  },
};
