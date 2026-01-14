import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGigById } from "../api/gigs";
import { getBidsForGig, placeBid, hireBid } from "../api/bids";
import BidCard from "../components/BidCard";
import toast from "react-hot-toast";

export default function GigDetails() {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBids = () => {
    getBidsForGig(id).then(res => setBids(res.data.data));
  };

  useEffect(() => {
    getGigById(id).then(res => setGig(res.data));
    fetchBids();
  }, [id]);

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await placeBid({ gigId: id, message, price });
      toast.success("Bid placed!");
      setMessage("");
      setPrice("");
      fetchBids();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place bid");
    } finally {
      setLoading(false);
    }
  };

  const handleHire = async (bidId) => {
    try {
      await hireBid(bidId);
      toast.success("Freelancer hired!");
      fetchBids();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to hire");
    }
  };

  if (!gig) return <div className="p-4">Loading...</div>;

  const isOwner = false; // replace after getMe integration

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow border">
        <h2 className="text-2xl font-bold">{gig.title}</h2>
        <p className="text-gray-600 mt-2">{gig.description}</p>
        <p className="font-semibold mt-2">Budget: ₹ {gig.budget}</p>
      </div>

      {!isOwner && (
        <form onSubmit={handlePlaceBid} className="bg-white p-6 rounded-2xl shadow border space-y-3">
          <h3 className="font-semibold text-lg">Place a Bid</h3>
          <textarea
            placeholder="Your message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="border rounded-xl p-3 w-full"
            required
          />
          <input
            type="number"
            placeholder="Your price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="border rounded-xl p-3 w-full"
            required
          />
          <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
            {loading ? "Submitting..." : "Place Bid"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        <h3 className="text-xl font-bold">Bids</h3>
        {bids.length === 0 && <p className="text-gray-500">No bids yet</p>}
        {bids.map(bid => (
          <BidCard key={bid._id} bid={bid} isOwner={isOwner} onHire={handleHire} />
        ))}
      </div>
    </div>
  );
}
