import { supabase } from '../db/connectDB.js';
import {users} from '../dummyData/data.js'


const userResolver = {
    Query: {
        users: async() => {
            try {
                const users = await supabase.from('users').select("*");
                return users.data;

            } catch (error) {
                console.log('Error fetching users:', error);
            }
        },

        user: (_, {userId}) => {
            return users.find((user) => user._id === userId);
        }
    },
    Mutation: {}
}


export default userResolver;