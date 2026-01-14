import { Link } from "react-router-dom";
import { IndianRupee, ArrowRight } from "lucide-react";

export default function GigCard({ gig }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between">
      <div>
        <h2 className="font-bold text-lg mb-2">{gig.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{gig.description}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-1 text-green-600 font-semibold">
          <IndianRupee size={16} />
          {gig.budget}
        </div>

        <Link
          to={`/gig/${gig._id}`}
          className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
        >
          View <ArrowRight size={16} />
        </Link>
      </div>

      <p className="mt-2 text-gray-400 text-sm">
        By: {gig.ownerId?.name || "Unknown"}
      </p>
    </div>
  );
}
