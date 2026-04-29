const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createGig,
  getGigs,
  getMyGigs,
  getGigById,
} = require("../controllers/gigController");

// 🌍 Public - all users can see and use
router.get("/", getGigs);

// 👤 Private - only logged-in user
router.get("/my", protect, getMyGigs);

// 🌍 Public - gig details page
router.get("/:id", getGigById);

// 👤 Private - create gig
router.post("/", protect, createGig);

module.exports = router;
