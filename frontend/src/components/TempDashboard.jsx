import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TempDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/validate", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "done") {
          setUser(data.username);
          console.log("Username:", data.username);
        } else {
          navigate("/login");
          setUser(null);
        }
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to FitLife</h1>
      {user ? (
        <p className="text-xl">Hello, {user} 👋</p>
      ) : (
        <p className="text-xl">Not logged in</p>
      )}
    </div>
  );
}
