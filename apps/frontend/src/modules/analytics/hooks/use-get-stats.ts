import { useQuery } from "@apollo/client/react";
import { GET_STATS } from "../graphql/get-stats.query";
import type { GetStatsResponse } from "@analytics/shared-types";
import type { EventGroupBy } from "../types/event.type";

type UseGetStatsProps = {
  groupBy: EventGroupBy;
  fromDate?: string;
  toDate?: string;
};

export function useGetStats({ groupBy, fromDate, toDate }: UseGetStatsProps) {
  return useQuery<GetStatsResponse>(GET_STATS, {
    fetchPolicy: "network-only",
    pollInterval: 3000, // TODO: change to realtime with WebSockets or GraphQL Subscriptions
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        groupBy,
        ...(fromDate && { from: fromDate }),
        ...(toDate && { to: toDate }),
      },
    },
  });
}
