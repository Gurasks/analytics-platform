export const analyticsTypeDefs = `#graphql
  extend type Query {
    eventStats(input: EventStatsInput!): [EventStat!]!
  }

  input EventStatsInput {
    from: String
    to: String
    groupBy: EventGroupBy!
  }

  enum EventGroupBy {
    TYPE
    USER
    DAY
  }

  type EventStat {
    key: String!
    count: Int!
  }
`;
