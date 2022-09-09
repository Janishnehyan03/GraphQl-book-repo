import { gql } from "@apollo/client";

const ADD_BOOK = gql`
  mutation addBook($title: String!, $details: String!, $authorId: ID!) {
    addBook(title: $title, details: $details, authorId: $authorId) {
      id
      title
      details
      authorId {
        name
        email
      }
    }
  }
`;
const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
      authorId {
        name
      }
    }
  }
`;

export { ADD_BOOK,DELETE_BOOK };
