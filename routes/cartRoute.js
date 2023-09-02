import express from "express";
import {addcartControllers, getcartControllers, updatecartControllers, deletecartControllers}  from "../controllers/cartController.js";

const router = express.Router();

router.route('/cart').post(addcartControllers);
router.route('/cart/:user').get(getcartControllers);
router.route('/cart/:cartItemId').put(updatecartControllers);
router.route('/cart/:cartItemId').delete(deletecartControllers);

export default router;