import mongoose from "mongoose"

import dotenv from "dotenv"

dotenv.config()
const DBCONNECT=async()=>{
try {
   const connectionInstance= await mongoose.connect(`${process.env.DB_URL}/user`)

} catch (error) {
  next(error)
}

} 
export {DBCONNECT}