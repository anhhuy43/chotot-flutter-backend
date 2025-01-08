const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/auth");
console.log("🚀 ~ upload.array", upload.array("images", 5));

router.post(
  "/",
  authMiddleware,
  upload.array("images", 5),
  productController.create
);

module.exports = router;
