import { useEffect, useState } from "react";
import { getMe, logoutUser } from "../api/auth";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMe()
      .then(res => setUser(res.data))
      .catch(() => {
        toast.error("Failed to load profile");
      });
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">Your account details</p>
          </div>
        </div>

        <div className="space-y-4">
          <InfoRow icon={<User size={18} />} label="Name" value={user.name} />
          <InfoRow icon={<Mail size={18} />} label="Email" value={user.email} />
          <InfoRow
            icon={<Calendar size={18} />}
            label="Joined"
            value={new Date(user.createdAt || Date.now()).toLocaleDateString()}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 border rounded-xl p-3">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
