import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolvers.js";

const mergedResolvers = mergeResolvers([userResolver, transactionResolver])

export default mergedResolvers;