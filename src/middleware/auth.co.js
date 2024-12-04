import { getUser } from "../utils/cokkie.js";

const verfiyUserLogin=(req,res,next)=>{

    const userId=req.cookies.userId
    if(!userId){
        res.redirect("/")
    }
    const user=getUser(userId )
    if(!user){
        res.redirect("/")
    }
    req.user=user
    next()
}
export {verfiyUserLogin}