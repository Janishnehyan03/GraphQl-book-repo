import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ViewAuthor from "./pages/ViewAuthor";
import ViewBook from "./pages/ViewBook";

export default function App() {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    uri: "/graphql",
    cache,
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-book/:id" element={<ViewBook />} />
          <Route path="/view-author/:id" element={<ViewAuthor />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
