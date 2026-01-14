const Bid = require("../models/Bid");
const Gig = require("../models/Gig");
const mongoose = require("mongoose");


// ========================= PLACE BID =========================
exports.placeBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !price) {
      return res.status(400).json({
        success: false,
        message: "gigId and price are required",
      });
    }

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    // Owner cannot bid on own gig
    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot bid on your own gig",
      });
    }

    // Prevent duplicate bid
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id,
    });

    if (existingBid) {
      return res.status(400).json({
        success: false,
        message: "You have already placed a bid on this gig",
      });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Bid placed successfully",
      data: bid,
    });

  } catch (err) {
    console.error("Place bid error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while placing bid",
    });
  }
};



// ========================= GET BIDS FOR GIG =========================
exports.getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Bids fetched successfully",
      count: bids.length,
      data: bids,
    });

  } catch (err) {
    console.error("Get bids error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching bids",
    });
  }
};



// ========================= HIRE BID =========================
exports.hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      throw new Error("Bid not found");
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      throw new Error("Gig not found");
    }

    // Only owner can hire
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      throw new Error("You are not authorized to hire for this gig");
    }

    if (gig.status === "assigned") {
      throw new Error("This gig is already assigned");
    }

    // Assign gig
    gig.status = "assigned";
    gig.assignedTo = bid.freelancerId;
    await gig.save({ session });

    // Mark hired bid
    bid.status = "hired";
    await bid.save({ session });

    // Reject others
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Freelancer hired successfully",
    });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
