import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";

dotenv.config();

let supabase;

const connectDB = async () => {
    try {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_KEY;

        // const url = 'https://vwkuxilpkcvcxzsbgtno.supabase.co'
        // const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3a3V4aWxwa2N2Y3h6c2JndG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODAxODIsImV4cCI6MjA3ODI1NjE4Mn0.vUCBViZf8hRLObbUgu6gw2KCrRdTvKEPLbLNB1s6EKQ'

        if (!url || !key) {
            throw new Error("Missing Supabase credentials");
        }



        supabase = createClient(url, key);

        // ✅ TEST QUERY — checks if connection works
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

export { connectDB, supabase };
