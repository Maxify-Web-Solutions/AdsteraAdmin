const express = require("express");
const router = express.Router();

const smartLinkController = require("../controllers/smartLinkController");
const authMiddleware = require("../middleware/authMiddleware");


// ================= USER =================

// ✅ Create smart link
router.post("/create", authMiddleware, smartLinkController.createSmartLink);

// ✅ Get logged-in user's links
router.get("/my-links", authMiddleware, smartLinkController.getSmartLinksByUser);


// ================= ADMIN =================

// ✅ Approve link
router.put("/approve/:id", smartLinkController.approveSmartLink);

router.put("/reject/:id", smartLinkController.rejectSmartLink);

// ================= EXTERNAL SYSTEM =================

router.post("/update-data", smartLinkController.updateSmartLinkData);


// ================= STATS =================

router.post("/track-impression", smartLinkController.trackImpression);

router.get("/stats/:linkId", smartLinkController.getSmartLinkStats);

router.get("/smart-links/pending", smartLinkController.getPendingSmartLinks);
router.get("/smart-links/approved", smartLinkController.getApprovedSmartLinks);
router.get("/smart-links/rejected", smartLinkController.getRejectedSmartLinks);
router.get("/admin/smart-links",  smartLinkController.getAllSmartLinks);

router.put("/admin/smartlink/reject/:id",  smartLinkController.rejectSmartLink);




// ================= PUBLIC =================

router.get("/s/:code", smartLinkController.redirectSmartLink);


module.exports = router;