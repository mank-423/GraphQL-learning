import { supabase, supabaseAdmin } from '../db/connectDB.js';


const userResolver = {
    Query: {
        users: async () => {
            try {
                const users = await supabase.from('users').select("*");
                return users.data;

            } catch (error) {
                console.log('Error fetching users:', error);
            }
        },

        authUser: async (_, __, { userId }) => {
            if (!userId) return null;

            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", userId)
                .single();

            if (error) {
                console.log("Error fetching user:", error);
                return null;
            }

            return data;
        }

    },
    Mutation: {
        signUp: async (_, { input }) => {
            const { email, password, username, name, gender } = input;

            // 1. Create Auth User
            const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true
            });

            if (authError) throw new Error(authError.message);

            const userId = authData.user.id;

            // Using avatar API:
            // https://avatar.iran.liara.run/public/boy?username=[username]

            const type = (gender === 'male') ? 'boy' : 'girl';

            const avatarUrl = `https://avatar.iran.liara.run/public/${type}?username=${username}`;

            // 2. Insert into your users table
            const { data: userRow, error: insertError } = await supabase
                .from('users')
                .insert({
                    id: userId,
                    username,
                    name,
                    gender,
                    email,
                    profilepic: avatarUrl,
                })
                .select()
                .single();

            if (insertError) {
                console.log("Failed inserting user profile");
                throw new Error(insertError.message);
            }

            return userRow;
        },
        logIn: async (_, { input }) => {
            const { email, password } = input;

            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (authError) {
                throw new Error(error.message);
            }

            const authUser = authData.user;
            const token = data.session.access_token;

            // 2. Fetch user row from your "users" table
            const { data: userRow, error: userError } = await supabase
                .from("users")
                .select("*")
                .eq("id", authUser.id)
                .single();

            if (userError) {
                throw new Error("User profile not found");
            }

            // 3. Return token + profile
            return {
                token,
                user: userRow,
            };

        }

    }
}


export default userResolver;