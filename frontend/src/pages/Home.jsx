import { useEffect, useState } from "react";
import { getGigs } from "../api/gigs";
import GigCard from "../components/GigCard";
import { Search } from "lucide-react";

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getGigs(search).then(res => setGigs(res.data));
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          placeholder="Search gigs..."
          className="pl-10 border p-3 rounded-xl w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {gigs.length === 0 && <p className="text-center text-gray-500">No gigs found 😔</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map(gig => <GigCard key={gig._id} gig={gig} />)}
      </div>
    </div>
  );
}
