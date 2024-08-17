import { asynchandler } from "../utils/asynchandler.js"
import {User} from "../models/user.model.js"
import {v4 as uuidv4} from "uuid"
import { setUser } from "../utils/cokkie.js"
import {uploadoncloudinary} from "../utils/uploadoncloudinary.js"
import { Text } from "../models/text.js"
import {Question} from "../models/contact.model.js"
import { Event } from "../models/event.model.js"
import mongoose from "mongoose"

const notice=asynchandler( async(req,res)=>{

// 



    const user=req.user?req.user:null
 

    const texts=await Text.find({}).populate('owner').sort({ createdAt: -1 });
     
    const text=await Text.find({})
    // const posts=await  Text.find({}).populate('owner').sort({createdAt:-1});
 if(user){
    if(text.length===0){
        if(user.isAdmin){
            const error={
                heading:"No post at the moment" , 
                paragraph:" try again later"  ,
                name:"Create New One",
                link: `/text/${user._id}`
            }
            return res.render('errorM.ejs',{error,user})
        }else{
            const error={
                heading:"No post at the moment" , 
                paragraph:"Create new one or  try again later"  
       
            }
            return res.render('errorM.ejs',{error,user})
        }
       
    }
 }

 if(!user){
    if(text.length===0){
        const error={
            heading:"No post at the moment" , 
            paragraph:"Check again later"  ,
         
        }
        return res.render('errorM.ejs',{error,user})
    }

 }

 return   res.render("noticeM.ejs",{posts:texts,user})


// 
})


const news=asynchandler(async(req,res)=>{
// 

    const user=req.user?req.user:null
    const postCount=await Event.find({})
 if(user){
    if(postCount.length===0){
        if(user.isAdmin){
            const error={
                heading:"No News or Events Found",
                paragraph:"There are no news or events at the moment. Please check back later.",
                link:"/event/post",
                name:" Create Event"
            }
        //   return  res.redirect("/event/post")
          return res.render("errorM.ejs",{error,user})



        }


       
    }
 }
 const eventPost=await Event.find({}).populate('owner').sort({createdAt:-1})

 if(!user || !user.isAdmin){
    if(postCount.length===0){

        const error={
            heading:"No News or Events Found",
            paragraph:"There are no news or events at the moment. Please check back later."
        }
       return res.render("errorM.ejs",{error,user})
    }
 }
   
    const eventPosts=eventPost?eventPost:null;


   return  res.render("newsM.ejs",{user,eventPosts})




    // 
})

const contact=asynchandler(async(req,res)=>{
    const {id}=req.params

    const user=await User.findById(id)
    if(!user){
       return res.redirect('/homepage')
    }
    // if user admin
    // const questions=await  Question.find({}).populate('user');
const questions=await Question.find({}).populate('user')

if(questions.length===0){
    const error={
        heading:"no questions  at a point",
        paragraph:"there are no question at a point check again later",
        link:""
    }

    return res.render("errorM.ejs",{error,user})
}


   return res.render("questionsM.ejs",{questions,user})
})



const textid=asynchandler(async(req,res)=>{
    const userlogged=req.user


 if(!userlogged){
    res.redirect("/homepage")
 }
    const {id}=req.params
    const user=await User.findById(id)
  if(!user){

    const error={
        heading:"User Not Found" ,
        paragraph:"Sorry there is no user according to your data" 
    }
    return res.render("error.ejs",{error,user})
  }


  return res.render("post.ejs",{user})
})

const textIdPost=asynchandler(async(req,res)=>{

    const {id}=req.params
    const photopath=req.file?.path

    const user=await User.findById(id)
    
    if(!user){
        const error={
            heading:"aunthorized access" ,
            paragraph:"" 
        }

        return res.render("error.ejs",{error,user})
    }
   

    if (!mongoose.Types.ObjectId.isValid(id)) {

       
        const error={
            heading:"Invalid user ID " ,
            paragraph:"" 
        }  

     
        return res.render("errorM.ejs",{error,user})
      }
      const photo=await uploadoncloudinary(photopath)
     
      const photoUrl=photo.url
     
  
    const {title}=req.body
    const newtexts= new Text({
        title:title,
        userPhoto:user.avatar,
        photo:photoUrl||null,
        owner:user._id

         
    })
    await newtexts.save()
    const post=await  Text.find({owner:user._id}).populate('owner');
    const posts=await  Text.find({}).populate('owner').sort({createdAt:-1});


  
    if(!post){
      
        
        const error={
            heading:"internal server error" ,
            paragraph:"sorry for inconvenience please try again" 
        }  


        return res.render("errorM.ejs",{error,user})
    }


    return res.render("noticeM.ejs",{posts,user})
})
const eventPostGet=asynchandler(async(req,res)=>{
    const {title,subtitle,description} =req.body;
    const user=req.user
   
    if(!(title||description)){
        const error={
            heading:"internal server error" ,
            paragraph:"sorry for inconvenience please try again" 
        }
    

        return res.render("errorM.ejs",{error,user})
        
    }

    const imageLocalPath=req.file?req.file.path:null
  if(imageLocalPath){
    var imagepath=await uploadoncloudinary(imageLocalPath)
  }
    const imageUrl=imagepath?imagepath.url:null
 
    const event=await Event.create({
        title,
        description,
        subtitle,
        image:imageUrl,
        owner:user._id

    })
    const texts=await Event.find({owner:user._id}).populate('owner').sort({ createdAt: -1 });

    res.redirect('/news')

})

const profileIdPost=asynchandler(async(req,res)=>{
    const id=req.params.id
 
    const user=await User.findOne({_id:id})
 const posts=await Text.find({owner:id}).populate('owner')
 if(posts.length===0){
    const error={
        heading:"No Post By User" ,
        paragraph:"User has not post anything as of Now ,check back later" 
    }


    return res.render("errorM.ejs",{error,user})
     
 }
 
 
 res.render("profilepostM.ejs",{posts,user})
 
 })
export {notice,news,contact,textid,textIdPost,eventPostGet,profileIdPost}