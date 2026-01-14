import { useState } from "react";
import { createGig } from "../api/gigs";
import { useNavigate } from "react-router-dom";
import { FileText, IndianRupee, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createGig({ title, description, budget });
      toast.success("Gig created successfully!");
      navigate("/my-gigs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md border">
        <h2 className="text-2xl font-bold mb-4">Create New Gig</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input icon={<FileText size={18} />} placeholder="Gig Title" value={title} onChange={setTitle} />

          <textarea
            placeholder="Describe your gig..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border rounded-xl p-3 w-full h-32 focus:ring-2 focus:ring-blue-500"
            required
          />

          <Input icon={<IndianRupee size={18} />} type="number" placeholder="Budget" value={budget} onChange={setBudget} />

          <button disabled={loading} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
            <PlusCircle size={18} />
            {loading ? "Creating..." : "Create Gig"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ icon, type = "text", placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-3.5 text-gray-400">{icon}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-10 border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}
