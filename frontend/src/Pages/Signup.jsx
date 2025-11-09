import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    gender: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password, username, gender } = form;

    // 1) Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const user = authData.user;

    // 2) Create profile record
    const { error: profileError } = await supabase.from("users").insert([
      {
        auth_id: user.id,
        username,
        gender,
        email,
      },
    ]);

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    alert("Signup Successful! Check your email for verification.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} style={styles.form}>
      <h2>Create Account</h2>

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />

      <select name="gender" value={form.gender} onChange={handleChange} required>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Sign Up"}
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxWidth: "300px",
    margin: "50px auto",
  },
  error: {
    color: "red",
  },
};
