import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchUser = async (e) => {

    setLoading(true);

    const token = Cookies.get('sb_token');

    const USER_QUERY = `
      query{
        authUser{
          id
          username
          profilepic
        }
      }
    `;

    try {
      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: USER_QUERY,
        }),
      });

      const result = await res.json();

      console.log('result:', result.data);
      setUserData(result.data);

      if (result.errors) {
        setLoading(false);
        return;
      }

    } catch (err) {
      console.log('Error:', err);
    }

    setLoading(false);
  };


  const logout = () => {
    Cookies.remove("sb_token");
    window.location.href = "/login";
  };


  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div>
      <h1>Protected Route</h1>

      {userData && (
        <img src={userData.authUser?.profilepic} alt="Image of user" />
      )}

      <button onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Home