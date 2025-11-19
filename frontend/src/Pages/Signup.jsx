import { SIGNUP_MUTATION } from "@/graphql/mutations/user.mutation";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    gender: "",
  });

  const [signUp, { loading }] = useMutation(SIGNUP_MUTATION, {
    onError: (err) => {
      setErrorMsg(err.message);
    }
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg(null);


    try {

      const res = await signUp({
        variables: {
          input: form,
        }
      });

      if (!res.data?.signUp) return;

      toast.success('Sign-up successful!');
      window.location.href = "/login";
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <form
        onSubmit={handleSignup}
        className="
          w-full max-w-sm 
          rounded-2xl 
          border border-neutral-800 
          bg-neutral-
          backdrop-blur-md 
          p-6 
          shadow-xl 
          flex flex-col gap-4
        "
      >
        <h2 className="text-2xl font-bold text-center text-white">
          Create Account
        </h2>

        {/* INPUTS — clean white bg */}
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="
            w-full rounded-lg px-3 py-2 
            bg-white text-black 
            border border-neutral-300 
            focus:outline-none focus:ring-2 focus:ring-neutral-500
          "
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="
            w-full rounded-lg px-3 py-2 
            bg-white text-black 
            border border-neutral-300 
            focus:outline-none focus:ring-2 focus:ring-neutral-500
          "
        />

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          className="
            w-full rounded-lg px-3 py-2 
            bg-white text-black 
            border border-neutral-300 
            focus:outline-none focus:ring-2 focus:ring-neutral-500
          "
        />

        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="
            w-full rounded-lg px-3 py-2 
            bg-white text-black 
            border border-neutral-300 
            focus:outline-none focus:ring-2 focus:ring-neutral-500
          "
        />

        {/* Gender Selection */}
        <div className="flex flex-row items-center text-white">
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={form.gender === "male"}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="accent-blue-500"
              />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={form.gender === "female"}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="accent-blue-500"
              />
              Female
            </label>
          </div>
        </div>

        {errorMsg && (
          <p className="text-red-400 text-center text-sm mt-1">{errorMsg}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full rounded-lg 
            bg-white text-black font-semibold py-2 
            hover:bg-neutral-200 transition 
            disabled:opacity-50
          "
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        {/* Link */}
        <div className="text-center text-neutral-300 mt-2">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-white underline hover:text-neutral-200 transition"
          >
            Log in
          </a>
        </div>
      </form>
    </div>
  );
}
