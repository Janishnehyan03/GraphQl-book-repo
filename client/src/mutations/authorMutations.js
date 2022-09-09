import { gql } from "@apollo/client";

const ADD_AUTHOR = gql`
  mutation addAuthor($name: String!, $phone: String!, $email: String!) {
    addAuthor(name: $name, phone: $phone, email: $email) {
      id
      name
      phone
      email
    }
  }
`;
const DELETE_AUTHOR = gql`
  mutation deleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
      name
      phone
      email
    }
  }
`;

export { DELETE_AUTHOR, ADD_AUTHOR };
