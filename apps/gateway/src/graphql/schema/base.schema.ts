export const baseTypeDefs = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Pagination {
    nextCursor: String
    hasMore: Boolean
  }
`;
