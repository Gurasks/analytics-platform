export const eventTypeDefs = `#graphql
  input EventQueryInput {
    cursor: String
    limit: Int
    type: String
    userId: String
  }

  type Event {
    id: ID!
    type: String!
    userId: String!
    createdAt: String!
  }

  type EventResponse {
    data: [Event!]!
    pagination: Pagination!
  }

  extend type Query {
    events(input: EventQueryInput): EventResponse!
  }

  extend type Mutation {
    trackEvent(input: TrackEventInput!): TrackEventPayload!
  }

  input TrackEventInput {
    type: String!
    userId: String!
  }

  type TrackEventPayload {
    success: Boolean!
  }
`;
