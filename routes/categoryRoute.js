import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryControllers.js";

const router = express.Router();

//routes
// create category
router.route("/create-category").post(requireSignIn,isAdmin,createCategoryController);

//update category
router.route("/update-category/:id").put(requireSignIn,isAdmin,updateCategoryController);

//getALl category
router.route("/getcategory").get(categoryControlller);

//single category
router.route("/singlecategory/:slug").get(singleCategoryController);

//delete category
router.route("/deletecategory/:id").delete(requireSignIn,isAdmin,deleteCategoryCOntroller);

export default router;