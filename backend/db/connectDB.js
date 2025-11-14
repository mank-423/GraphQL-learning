import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";

dotenv.config();

let supabase;

const connectDB = async () => {
    try {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_KEY;

        if (!url || !key) {
            throw new Error("Missing Supabase credentials");
        }

        supabase = createClient(url, key);

        const { data, error } = await supabase.from("users").select("*").limit(1);

        if (error) {
            throw error;
        }

        console.log("✅ Supabase connected successfully");
    } catch (error) {
        console.error("❌ Supabase connection failed:", error.message);
        process.exit(1);
    }
};

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);


export { connectDB, supabase, supabaseAdmin };
