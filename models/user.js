import mongoose  from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    googleID : String
}); 

export default mongoose.model('users',userSchema);