import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Home = () => {

  const [loading, setLoading] = useState(false);

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

      console.log('result:', result);
      if (result.errors) {
        setLoading(false);
        return;
      }

    } catch (err) {
      console.log('Error:', err);
    }

    setLoading(false);
  };

  useEffect(()=>{
    fetchUser();
  }, [])

  return (
    <div>
      <h1>Protected Route</h1>
    </div>
  )
}

export default Home