import mongoose,{Schema} from "mongoose"

const textSchema=new Schema({
    title:{
        type:String
    },
    photo:{
        type:String,
        // default:null
    },
    userPhoto:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
export const Text=mongoose.model("text",textSchema)