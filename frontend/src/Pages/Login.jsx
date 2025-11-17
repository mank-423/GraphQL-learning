import { useState } from "react";
import Cookies from "js-cookie";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    const accessToken = data.session?.access_token;
    if (!accessToken) {
      setErrorMsg("No session returned");
      return;
    }

    Cookies.set("sb_token", accessToken, {
      expires: 1 / 24,
      secure: true,
      sameSite: "Strict",
    });

    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-black/60 backdrop-blur-md p-6 shadow-2xl flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-white text-center">Login</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg px-3 py-2 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg px-3 py-2 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-neutral-100 text-black font-semibold py-2 hover:bg-white transition"
        >
          Login
        </button>

        {errorMsg && (
          <p className="text-red-400 text-center text-sm mt-2">{errorMsg}</p>
        )}

        <div className="text-center text-neutral-400 mt-3">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-white underline hover:text-neutral-300 transition"
          >
            Sign up
          </a>
        </div>
      </form>



    </div>
  );
}
