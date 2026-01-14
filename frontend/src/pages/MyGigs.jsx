import { useEffect, useState } from "react";
import { getMyGigs } from "../api/gigs";
import GigCard from "../components/GigCard";

export default function MyGigs() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    getMyGigs().then(res => setGigs(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Gigs</h2>

      {gigs.length === 0 && <p>No gigs created yet.</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map(gig => <GigCard key={gig._id} gig={gig} />)}
      </div>
    </div>
  );
}
