import { CheckCircle } from "lucide-react";

export default function BidCard({ bid, isOwner, onHire }) {
  const statusColor =
    bid.status === "accepted" ? "bg-green-100 text-green-700" :
    bid.status === "rejected" ? "bg-red-100 text-red-700" :
    "bg-yellow-100 text-yellow-700";

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex justify-between items-center">
      <div>
        <p className="font-semibold">{bid.freelancerId?.name || "Unknown"}</p>
        <p className="text-sm text-gray-600">{bid.message}</p>
        <p className="text-sm font-medium mt-1">₹ {bid.price}</p>

        <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${statusColor}`}>
          {bid.status}
        </span>
      </div>

      {isOwner && bid.status === "pending" && (
        <button
          onClick={() => onHire(bid._id)}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <CheckCircle size={16} />
          Hire
        </button>
      )}
    </div>
  );
}
