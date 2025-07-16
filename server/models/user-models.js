const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// compare the password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare( password, this.password );
};

userSchema.methods.generateToken = async function() {
    try {
        const token = jwt.sign({
            //payload
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_KEY,
        {
            expiresIn: "10d",
        }
    );
    return token
    } catch (error) {
        console.error("Token Generation Error:", error);
        throw error;
    }
}

const User = new mongoose.model("User", userSchema);

module.exports = User;
