const Product = require("../models/Product");
const authConstant = require("../constants/authConstant");

class ProductController {
  // [POST] /product/create
  async create(req, res, next) {
    const { name, price, description } = req.body;
    const userId = req.user.userId;

    try {
      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "No images uploaded!" });
      }

      const images = req.files.map((file) => {
        return `/uploads/${file.filename}`;
      });

      const newProduct = new Product({
        name,
        price,
        description,
        images,
        userId,
      });

      await newProduct.save();

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  // // [GET] /product/:id
  // async getProductById(req, res, next) {
  //   const { id } = req.params;

  //   try {
  //     const product = await Product.findById(id);

  //     if (!product) {
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "Product not found!" });
  //     }

  //     res.status(200).json({ success: true, product });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // // [PUT] /product/update/:id
  // async update(req, res, next) {
  //   const { id } = req.params;
  //   const { name, price, description } = req.body;

  //   try {
  //     const updatedProduct = await Product.findByIdAndUpdate(
  //       id,
  //       { name, price, description },
  //       { new: true } // Trả về document sau khi cập nhật
  //     );

  //     if (!updatedProduct) {
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "Product not found!" });
  //     }

  //     res.status(200).json({
  //       success: true,
  //       message: "Product updated successfully",
  //       product: updatedProduct,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // // [DELETE] /product/delete/:id
  // async delete(req, res, next) {
  //   const { id } = req.params;

  //   try {
  //     const deletedProduct = await Product.findByIdAndDelete(id);

  //     if (!deletedProduct) {
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "Product not found!" });
  //     }

  //     res.status(200).json({
  //       success: true,
  //       message: "Product deleted successfully",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // // [PUT] /product/hide/:id
  // async hide(req, res, next) {
  //   const { id } = req.params;

  //   try {
  //     const hiddenProduct = await Product.findByIdAndUpdate(
  //       id,
  //       { isHidden: true }, // Đặt cờ ẩn sản phẩm
  //       { new: true }
  //     );

  //     if (!hiddenProduct) {
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "Product not found!" });
  //     }

  //     res.status(200).json({
  //       success: true,
  //       message: "Product hidden successfully",
  //       product: hiddenProduct,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = new ProductController();
