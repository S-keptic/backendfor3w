const express = require("express");
const { submitUserData, getAllSubmissions } = require("../controllers/userController");
const { authenticateToken, authorizeAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/submit", upload.array("images", 10), submitUserData);

router.get("/submissions", authenticateToken, authorizeAdmin, getAllSubmissions);

module.exports = router;
