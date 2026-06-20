// Importing modules
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_SECRET } from "../config/env.config.js";

// Defining the user schema
const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true,
            unique : [true, "User already exists with this name"]
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        password : {
            type : String,
            required : true,
            minlength : 6,
            select : false
        },
    },
    {
        timestamps : true
    }
);

// Removing password from JSON responses
userSchema.set("toJSON", {
    transform(doc, ret) {
        delete ret.password;
        return ret;
    }
});

// Hashing password before saving user
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// Comparing user password
userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Generating single auth token
userSchema.methods.generateToken = function () {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign(
        {
            id : this._id,
            email : this.email,
            username : this.name
        },
        JWT_SECRET,
        {
            expiresIn : "7d"
        }
    );
};

// Creating the user model
const User = mongoose.model("User", userSchema);

// Exporting user model
export default User;
