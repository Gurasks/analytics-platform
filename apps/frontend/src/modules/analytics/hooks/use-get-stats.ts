import { useQuery } from "@apollo/client/react";
import { GET_STATS } from "../graphql/get-stats.query";
import type { GetStatsResponse } from "@analytics/shared-types";

export function useGetStats() {
  return useQuery<GetStatsResponse>(GET_STATS, {
    pollInterval: 3000, // TODO: change to realtime with WebSockets or GraphQL Subscriptions
    notifyOnNetworkStatusChange: true,
  });
}
