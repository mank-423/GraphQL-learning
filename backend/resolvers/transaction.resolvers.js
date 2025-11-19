import { supabase } from "../db/connectDB.js";


const transactionResolver = {
    Query: {
        transactions: async (_, __, { userId }) => {
            try {
                const { data, error } = await supabase
                    .from('transactions')
                    .select("*")
                    .eq("user_id", userId)
                    .order('created_at', { ascending: false });

                if (error) {
                    throw new Error(error.message);
                }

                return data; // Return only the data, not the whole response

            } catch (error) {
                console.log('Error:', error.message);
                throw new Error(error.message || 'Error occurred while fetching transactions');
            }
        },

        transaction: async (_, { transactionId }) => {
            try {
                const { data, error } = await supabase
                    .from('transactions')
                    .select('*')
                    .eq('id', transactionId)
                    .single(); // Use single() for one record

                if (error) {
                    throw new Error(error.message);
                }

                return data;

            } catch (error) {
                console.log('Error:', error.message);
                throw new Error(error.message || 'Error getting individual transaction');
            }
        },

        // Category statistics
        categoryStatistics: async (_, __, { userId }) => {
            try {
                const categoryMap = {};

                const res = await supabase.from('transactions').select("*").eq('user_id', userId);

                if (res?.data){
                    res.data.map((transaction) => {
                        if (categoryMap[transaction.type]){
                            categoryMap[transaction.type] += parseFloat(transaction.amount);
                        }else{
                            categoryMap[transaction.type] = parseFloat(transaction.amount);
                        }
                    })
                }

                return categoryMap;

            } catch (error) {
                console.log('Error category statistics:', error.message);
            }
        }
    },
    Mutation: {
        createTransaction: async (_, { input }, { userId }) => {
            try {
                const { data, error } = await supabase
                    .from("transactions")
                    .insert([
                        {
                            user_id: userId,
                            amount: input.amount,
                            description: input.description,
                            type: input.type,
                        }
                    ])
                    .select()
                    .single();

                if (error) {
                    throw new Error(error.message);
                }

                return data;

            } catch (error) {
                console.log('Error:', error.message);
                throw new Error(error.message || 'Error creating transaction');
            }
        },

        updateTransaction: async (_, { input }, { userId }) => {
            try {
                const { data, error } = await supabase
                    .from("transactions")
                    .update({
                        amount: input.amount,
                        description: input.description,
                        type: input.type,
                    })
                    .eq('id', input.transactionId) // Added quotes and fixed parameter
                    .select()
                    .single();

                if (error) {
                    throw new Error(error.message);
                }

                return data;

            } catch (error) {
                console.log('Error:', error.message);
                throw new Error(error.message || 'Error updating transaction');
            }
        },

        deleteTransaction: async (_, { transactionId }, { userId }) => {
            try {
                const { data, error } = await supabase
                    .from("transactions")
                    .delete()
                    .eq('id', transactionId) // Added quotes
                    .select() // Add select to return deleted data
                    .single();

                if (error) {
                    throw new Error(error.message);
                }

                return data;

            } catch (error) {
                console.log('Error deleting transaction:', error.message);
                throw new Error(error.message || 'Error deleting transaction');
            }
        },
    }
}

export default transactionResolver;