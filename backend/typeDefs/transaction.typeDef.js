const transactionTypeDef = `#graphql
    type Transaction{
        id: ID!
        user_id: ID!
        description: String!
        amount: Float!
        type: String!
    }

    type Stats{
        credit: Float!
        debit: Float!
    }


    type Query{
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
        categoryStatistics: Stats!
    }

    type Mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    input CreateTransactionInput {
        description: String!
        amount: Float!
        type: String!
    }

    input UpdateTransactionInput {
        transactionId: ID!
        description: String
        category: String
        amount: Float
        type: String!
    }
`

export default transactionTypeDef;