import  express from "express";
import {testController, updateProfileController,registercontrollers,
    getOrdersController, forgotpasswordControllers, reserpasswordControllers,
    getAllOrdersController, logincontrollers, changepasswordControllers, validuserControllers,
    orderStatusController,
    addcartControllers, 
    removecartControllers} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";



//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST

router.route("/register").post(registercontrollers);
router.route("/login").post(logincontrollers)
router.route("/sendpasswordlink").post(reserpasswordControllers);
router.route("/forgotpassword/:id/:token").get(forgotpasswordControllers);
router.route("/:id/:token").post(changepasswordControllers);
router.route("/validuser").get(validuserControllers)

//cart
router.route("/addcart").post(addcartControllers);
router.route("/delete").delete(removecartControllers);



//logout
router.route("/test").get(requireSignIn,isAdmin,testController);
router.route("/user-auth").get(requireSignIn, (req,res) =>{
    res.status(200).send({ok:true});
})

//admin 
router.route("/admin").get(requireSignIn,isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
})

//update profile
router.route("/profile").put(requireSignIn, updateProfileController);

//orders
router.route("/orders").get(requireSignIn, getOrdersController);

//all orders
router.route("/all-orders").get(requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.route(
  "/order-status/:orderId").put
  (requireSignIn,
  isAdmin,
  orderStatusController
);
//export router
export default router;
