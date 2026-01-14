const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { placeBid, getBidsForGig, hireBid } = require("../controllers/bidController");

router.post("/", protect, placeBid);
router.get("/:gigId", protect, getBidsForGig);
router.patch("/:bidId/hire", protect, hireBid);

module.exports = router;
