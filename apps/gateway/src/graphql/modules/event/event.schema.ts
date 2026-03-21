export const eventTypeDefs = `#graphql
  type Event {
    id: ID!
    type: String
    userId: String
    createdAt: String
  }

  type EventResponse {
    data: [Event]
    pagination: Pagination
  }

  extend type Query {
    events(
      cursor: String
      limit: Int
    ): EventResponse
  }
`;
