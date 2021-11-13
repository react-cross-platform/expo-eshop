import { ApolloProvider } from "@apollo/client";
import React from "react";
import client from "./src/graphql/client";
import { Router } from "./src/navigation";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}

export default App;
