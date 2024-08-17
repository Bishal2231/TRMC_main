import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
const userSchema=new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        unique:true
    },avatar:{
        type:String
       
    },coverImage:{
        type:String,
        default:"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?t=st=1722712178~exp=1722715778~hmac=4ab539523b9e8f537bcb74b1f388c239935561be781459d7863c3f7ce90b8415&w=740"
    },address:{
        type:String
    },
    profession:{
        type:String,
        default:"student"
    },
    likedPost:{
        type:Number,
        default:0
    },
    DOB:{
        type:String
    }
    ,bio:{
        type:String
    },friends:{
        type:Number,
        default:0
    },post:{
        type:mongoose.Types.ObjectId,
        ref:"Text"
    },isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
export const User=mongoose.model("User",userSchema)