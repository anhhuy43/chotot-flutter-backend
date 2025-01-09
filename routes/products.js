const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");
const protect = require("../middleware/auth");

router.post(
  "/",
  protect,
  upload.array("images", 5),
  productController.create
);

module.exports = router;
