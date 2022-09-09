import { gql } from "@apollo/client/core";

const GET_AUTHORS = gql`
  query getAuthors {
    authors {
      id
      name
      email
    }
  }
`;

export { GET_AUTHORS };
