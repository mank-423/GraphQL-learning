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

    // ✅ Store in cookie (not HttpOnly, but secure + short life)
    Cookies.set("sb_token", accessToken, {
      expires: 1 / 24, // 1 hour
      secure: true,
      sameSite: "Strict",
    });

    alert("Logged in!");
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </form>
  );
}
