import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  User
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/auth";

export default function Navbar() {
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    toast.success("Logged out!");
    navigate("/login");
  };

  if (loading) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          GigFlow
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <NavLink to="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />
              <NavLink to="/my-gigs" icon={<Briefcase size={18} />} text="My Gigs" />
              <NavLink to="/create-gig" icon={<PlusCircle size={18} />} text="Create" />
              <NavLink to="/profile" icon={<User size={18} />} text="Profile" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/register" className="hover:text-blue-600">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }) {
  return (
    <Link to={to} className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
      {icon}
      {text}
    </Link>
  );
}
