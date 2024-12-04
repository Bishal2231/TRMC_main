import mongoose,{Schema} from "mongoose"


const questionSchema=new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
            
},{
    timestamps:true
})
export const Question=mongoose.model("Question",questionSchema)
