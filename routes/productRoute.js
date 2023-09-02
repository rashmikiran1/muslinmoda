import express from "express";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  productPhoto1Controller,
  realtedProductController,
  searchProductController,
  updateProductController,
  sortController,
} from "../controllers/productControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.route(
  "/create-product").post
  (requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.route(
  "/update-product/:pid").put
  (requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.route("/get-product").get(getProductController);

//single product
router.route("/get-product/:slug").get(getSingleProductController);

//get photo
router.route("/product-photo/:pid").get(productPhotoController);

//get photo
router.route("/product-photo1/:pid").get(productPhoto1Controller);


//delete rproduct
router.route("/delete-product/:pid").delete(deleteProductController);

//filter product
router.route("/product-filters").post(productFiltersController);

//product count
router.route("/product-count").get(productCountController);

//product per page
router.route("/product-list/:page").get(productListController);

//search product
router.route("/search/:keyword").get(searchProductController);

//similar product
router.route("/related-product/:pid/:cid").get(realtedProductController);

//category wise product
router.route("/product-category/:slug").get(productCategoryController);

//sort
router.route("/sort").get(sortController)

//payments routes
//token
router.route("/braintree/token").get(braintreeTokenController);

//payments
router.route("/braintree/payment").post(requireSignIn, brainTreePaymentController);

export default router;