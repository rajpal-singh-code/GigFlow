import { useEffect, useState } from "react";
import { getGigs } from "../api/gigs";
import GigCard from "../components/GigCard";

export default function Dashboard() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await getGigs(); // fetch all public gigs
        setGigs(res.data);
      } catch (err) {
        console.error("Failed to fetch gigs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading gigs...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard - All Gigs</h2>

      {gigs.length === 0 && (
        <p className="text-center text-gray-500">No gigs available 😔</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map(gig => (
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>
    </div>
  );
}
