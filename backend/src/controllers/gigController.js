const Gig = require("../models/Gig");

/**
 * Create new gig
 */
exports.createGig = async (req, res) => {
  try {
    const gig = await Gig.create({
      title: req.body.title,
      description: req.body.description,
      budget: req.body.budget,
      ownerId: req.user._id,
      status: "open", // ensures visibility
    });

    res.status(201).json(gig);
  } catch (err) {
    console.error("Create gig error:", err);
    res.status(500).json({ message: "Failed to create gig" });
  }
};

/**
 * Get all public gigs (Home / Dashboard)
 */
exports.getGigs = async (req, res) => {
  try {
    const search = req.query.search || "";

    const gigs = await Gig.find({
      title: { $regex: search, $options: "i" },
    })
      .populate("ownerId", "name email") // ✅ populate owner
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (err) {
    console.error("Get gigs error:", err);
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
};

/**
 * Get logged-in user's gigs
 */
exports.getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user._id })
      .populate("ownerId", "name email")
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (err) {
    console.error("Get my gigs error:", err);
    res.status(500).json({ message: "Failed to fetch my gigs" });
  }
};

/**
 * Get single gig by ID
 */
exports.getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate("ownerId", "name email");

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (err) {
    console.error("Get gig by id error:", err);
    res.status(500).json({ message: "Failed to fetch gig" });
  }
};
