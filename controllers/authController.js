import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import nodemailer from "nodemailer";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";


// email config
const tarnsporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
})


export const registercontrollers = async (req, res) => {
  const { fname, email, password, cpassword, phone, address } = req.body;

  if (!fname || !email || !password || !cpassword || !phone || !address) {
      res.status(400).json({ error: "Please Enter All Input Data" })
  }

  try {
      const presuer = await userModel.findOne({ email: email });

      if (presuer) {
          res.status(409).json({ error: "This User Allready exist in our db" })
      } else {
          const registercontrollers = new userModel({
              fname, email, password, cpassword, phone, address
          });

          // here password hasing

          const storeData = await registercontrollers.save();
          res.status(200).json(storeData);
      }
  } catch (error) {
      console.log(error)
      res.status(400).json({ error: "Invalid Details", error })
  }

};




//POST LOGIN
export const logincontrollers = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.fname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
// user valid
export const validuserControllers = async(req,res)=>{
  try {
      const ValidUserOne = await userModel.findOne({_id:req.userId});
      res.status(201).json({status:201,ValidUserOne});
  } catch (error) {
      res.status(401).json({status:401,error});
  }
};

// send email Link For reset Password
export const reserpasswordControllers = async(req,res)=>{
  console.log(req.body)

  const {email} = req.body;

  if(!email){
      res.status(401).json({status:401,message:"Enter Your Email"})
  }

  try {
      const userfind = await userModel.findOne({email:email});

      // token generate for reset password
      const token = jwt.sign({_id:userfind._id},process.env.SECRET_KEY,{
          expiresIn:"120s"
      });
      
      const setusertoken = await userModel.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


      if(setusertoken){
          const mailOptions = {
              from:process.env.EMAIL,
              to:email,
              subject:"Sending Email For password Reset",
              text:`This Link Valid For 2 MINUTES http://localhost:3001/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
          }

          transporter.sendMail(mailOptions,(error,info)=>{
              if(error){
                  console.log("error",error);
                  res.status(401).json({status:401,message:"email not send"})
              }else{
                  console.log("Email sent",info.response);
                  res.status(201).json({status:201,message:"Email sent Succsfully"})
              }
          })

      }

  } catch (error) {
      res.status(401).json({status:401,message:"invalid user"})
  }

};


// verify user for forgot password time
export const forgotpasswordControllers = async(req,res)=>{
  const {id,token} = req.params;

  try {
      const validuser = await userModel.findOne({_id:id,verifytoken:token});
      
      const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

      console.log(verifyToken)

      if(validuser && verifyToken._id){
          res.status(201).json({status:201,validuser})
      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }

  } catch (error) {
      res.status(401).json({status:401,error})
  }
};


// change password

export const changepasswordControllers = async(req,res)=>{
  const {id,token} = req.params;

  const {password} = req.body;

  try {
      const validuser = await userModel.findOne({_id:id,verifytoken:token});
      
      const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

      if(validuser && verifyToken._id){
          const newpassword = await bcrypt.hash(password,12);

          const setnewuserpass = await userModel.findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})

      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }
  } catch (error) {
      res.status(401).json({status:401,error})
  }
}


//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
    
//add to cart
export const addcartControllers =   async (req, res) => {
  try {
    const { productId } = req.body;
    console.log(productId) // 
    const user = await userModel.findById(req.user._id);
   console.log(user)
    // Call the addCartItem method on the user instance
    await user.addCartItem(productId);

    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

export const removecartControllers =  async (req, res) => {
  try {
    const { productId } = req.body; // Assuming the product ID is provided in the request body
    const user = await userModel.findById(req.user._id); // Assuming the user ID is available in the request object

    // Call the removeCartItem method on the user instance
    await user.removeCartItem(productId);

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

