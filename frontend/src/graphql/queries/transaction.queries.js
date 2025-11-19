import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        transactions {
          id
          amount
          description
          type
        }
      }
`

export const GET_TRANSACTION = gql`
  query SingleTransaction($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
      id
      amount
      description
      type
    }
  }
`

export const GET_CHART_DATA = gql`
  query GetChartData{
    categoryStatistics{
      credit
      debit
    }
  }
`
