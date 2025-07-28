import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
            min:[2,"name must be atleast 2 characters."],
            max:[50,"name should be less than 50 characters."]
        },
        email:{
            type:String,
            trim:true,
            required:true,
            lowercase:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            min:[6,"Password must be atleast 6 characters"]
        },
        token:{
            type:String
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        }
    }
,{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next()
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email
    },
    process.env.JWT_TOKEN_SECRET,
    {
        expiresIn:process.env.JWT_TOKEN_EXPIRY
    }
)}

export const User = mongoose.model("User",userSchema)