
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import { Loader, Search, AlertCircle } from "lucide-react";
import "./styles/App.css";


const App = () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      // .get("https://jsonplaceholder.typicx.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Optimized filtering
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [users, searchValue]);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <Loader className="spin" />
        <p className="loading-text">Loading Users…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-wrapper">
        <AlertCircle />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>User Dashboard</h1>

      <div className="search-container">
        <Search />
        <input
          type="text"
          placeholder="Search users..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="users-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <p>No users found 😢</p>
        )}
      </div>
    </div>
  );
};

export default App;
