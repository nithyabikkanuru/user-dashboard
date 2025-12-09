import { Mail, Building2 } from "lucide-react";
import "../styles/UserCard.css";


const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>
        <Mail size={18} /> {user.email}
      </p>
      <p>
        <Building2 size={18} /> {user.company.name}
      </p>
    </div>
  );
};

export default UserCard;


