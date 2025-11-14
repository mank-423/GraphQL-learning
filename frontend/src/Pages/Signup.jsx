import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    gender: "",
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const SIGNUP_MUTATION = `
      mutation signUp($input: SignUpInput!) {
        signUp(input: $input) {
          id
          username
        }
      }
    `;

    try {
      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: SIGNUP_MUTATION,
          variables: { input: form },
        }),
      });

      const result = await res.json();

      if (result.errors) {
        setErrorMsg(result.errors[0].message);
        setLoading(false);
        return;
      }

      alert("Signup successful!");
      window.location.href = "/login";

    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSignup}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "300px",
        margin: "auto",
        marginTop: "40px"
      }}
    >
      <h2>Signup</h2>

      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />

      <input
        placeholder="Username"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        required
      />

      <input
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      {/* Gender Selection */}
      <div>
        <label style={{ marginRight: "10px" }}>Gender:</label>

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={form.gender === "male"}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />
          Male
        </label>

        <label style={{ marginLeft: "10px" }}>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={form.gender === "female"}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          />
          Female
        </label>
      </div>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
}
