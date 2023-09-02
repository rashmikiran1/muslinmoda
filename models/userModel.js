import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not Valid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: Number,
        required: true,
        minlength:10
      },
      address: {
        type: {},
        required: true,
      },
      role: {
        type: Number,
        default: 0,
      },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    verifytoken:{
        type: String,
    },
    cart: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
});

// hash password

userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next()
});


// token generate
userSchema.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        res.status(422).json(error)
    }
}
userSchema.methods.addCartItem = async function(product) {
    // Check if the product is already in the cart
    const cartItem = this.cart.find(item => item.item.toString() === product._id.toString());

    if (cartItem) {
        // If the product is already in the cart, increase the quantity
        cartItem.quantity += 1;
    } else {
        // If the product is not in the cart, add it with quantity 1
        this.cart.push({ item: product._id });
    }

    await this.save();
};

userSchema.methods.removeCartItem = async function(product) {
    this.cart = this.cart.filter(item => item.item.toString() !== product._id.toString());
    await this.save();
};



export default mongoose.model("User", userSchema);
