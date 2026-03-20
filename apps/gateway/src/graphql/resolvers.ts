import axios from "axios";

export const resolvers = {
  Query: {
    events: async () => {
      const res = await axios.get("http://localhost:4001/events");
      return res.data;
    },
  },
};
