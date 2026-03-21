import axios from "axios";
import { config } from "../config";

export const resolvers = {
  Query: {
    events: async () => {
      const res = await axios.get(`${config.eventServiceUrl}/events`);
      return res.data;
    },
  },
};
