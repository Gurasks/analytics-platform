export const typeDefs = `#graphql
  type Event {
    id: ID!
    type: String
    userId: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    events: [Event!]!
  }
`;
