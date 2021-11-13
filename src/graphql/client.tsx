import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://buybag.com.ua/graphql",
  cache: new InMemoryCache(),
});

export default client;
