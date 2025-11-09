import { signOut } from "../lib/auth";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { session } = useAuth();

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Logged in as: {session?.user?.email}</p>

      <button onClick={signOut}>Logout</button>
    </div>
  );
}
