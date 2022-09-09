import { gql } from "@apollo/client/core";

const GET_BOOKS = gql`
  query getBooks {
    books {
      id
      title
      authorId {
        name
      }
    }
  }
`;
const GET_BOOK = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      id
      title
      details
      authorId {
        name
        email
        id
        phone
      }
    }
  }
`;

export { GET_BOOKS, GET_BOOK };
