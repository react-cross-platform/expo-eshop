import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://buybag.com.ua/graphql",
  cache: new InMemoryCache(),

  // cache: new InMemoryCache({
  //   typePolicies: {
  //     Query: {
  //       fields: {
  //         allProducts: {
  //           // Don't cache separate results based on
  //           // any of this field's arguments.
  //           keyArgs: false,
  //           // Concatenate the incoming list items with
  //           // the existing list items.
  //           merge(existing = {}, incoming) {
  //             if (!existing?.products) {
  //               return {
  //                 ...existing,
  //                 ...incoming,
  //               };
  //             }

  //             return {
  //               ...existing,
  //               ...incoming,
  //               products: [...existing?.products, ...incoming.products],
  //             };
  //           },
  //         },
  //       },
  //     },
  //   },
  // }),
});

export default client;
