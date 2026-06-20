// Importing modules
import mongoose from "mongoose";

// Defining the link schema
const linkSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
            trim : true
        },
        url : {
            type : String,
            required : true,
            trim : true
        },
        username : {
            type : String,
            required : true,
            trim : true
        }
    },
    {
        timestamps : true
    }
);

// Exporting the link model
const Link = mongoose.model("Link", linkSchema);
export default Link;