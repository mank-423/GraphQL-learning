import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
        mutation createTransaction($input: CreateTransactionInput!) {
          createTransaction(input: $input) {
            id
            amount
            description
            type
          }
        }
`;

export const UPDATE_TRANSACTION = gql`
        mutation updateTransaction($input: UpdateTransactionInput!) {
          updateTransaction(input: $input) {
            id
            amount
            description
            type
          }
        }
`;