const transactionTypeDef = `#graphql
    type Transaction{
        id: ID!
        user_id: ID!
        description: String!
        amount: Float!
        type: String!
        date: String!
    }


    type Query{
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
    }

    type Mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    input CreateTransactionInput {
        description: String!
        category: String!
        amount: Float!
        date: String!
        type: String!
    }

    input UpdateTransactionInput {
        trasactionId: ID!
        description: String
        category: String
        amount: Float
        date: String
        type: String!
    }
`

export default transactionTypeDef;