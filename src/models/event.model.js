import mongoose,{Schema} from "mongoose"


const eventSchema= new Schema({

title:{
    type:String
},
image:{
    type:String
},
subtitle:{
    type:String
}
,description:{
type:String
},owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},isAdmin:{
    type:Boolean,
    default:false

}

},{timestamps:true})
export const Event=mongoose.model("Event",eventSchema)