import { gql } from "@apollo/client";

export const GET_STATS = gql`
  query GetStats {
    eventStats(input: { groupBy: TYPE }) {
      key
      count
    }
  }
`;
