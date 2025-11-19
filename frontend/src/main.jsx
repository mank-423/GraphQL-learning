import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GridSmallBackground } from "./components/GridSmallBackground.jsx";
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Cookies from "js-cookie";

const authLink = new ApolloLink((operation, forward) => {
  const token = Cookies.get("sb_token");

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: import.meta.env.VITE_BACKEND_URL })),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GridSmallBackground>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GridSmallBackground>
  </BrowserRouter>
);
