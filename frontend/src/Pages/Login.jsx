import { useState } from "react";
import { signInWithEmail } from "../lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const { error } = await signInWithEmail(email, password);
    if (error) setError(error.message);
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button type="submit">Sign In</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
