const userTypeDef = `#graphql
type User {
  id: ID!
  username: String!
  name: String!
  password: String!
  profilePicture: String
  gender: String!
}

type Query {
  users: [User!]!
  authUser: User
  user(userId: ID!): User
}

type Mutation {
  signUp(input: SignUpInput!): User!
  logIn(input: LoginInput!): User
  logout: LogoutResponse!
}

input SignUpInput {
  email: String!
  username: String!
  name: String!
  password: String!
  gender: String!
}

input LoginInput {
  username: String!
  password: String!
}

type LogoutResponse {
  message: String!
}

`

export default userTypeDef;