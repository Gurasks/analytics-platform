import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import { config } from "@/config";

type ApolloProviderWrapperProps = {
  children: React.ReactNode;
};

const httpLink = new HttpLink({
  uri: config.viteGraphqlUrl,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = "your-token";

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export function ApolloProviderWrapper({ children }: ApolloProviderWrapperProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}