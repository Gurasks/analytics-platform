import { gql } from "@apollo/client";

export const GET_STATS = gql`
  query GetStats($input: EventStatsInput!) {
    eventStats(input: $input) {
      key
      count
    }
  }
`;
