
import { asynchandler } from "../utils/asynchandler.js"
import {User} from "../models/user.model.js"
import {v4 as uuidv4} from "uuid"
import { setUser } from "../utils/cokkie.js"
import {uploadoncloudinary} from "../utils/uploadoncloudinary.js"
import { Text } from "../models/text.js"
import {Question} from "../models/contact.model.js"




const handlerUserSignup = asynchandler(async (req, res, next) => {
    try {
        
        const { name, email, password, address, profession, DOB, bio } = req.body;
        
        // Handle file uploads
        const avatarPath = req.files && req.files['avatar'] ? req.files['avatar'][0].path : null;
        const coverImagePath = req.files && req.files['coverImage'] ? req.files['coverImage'][0].path : null;

        // Check if the user is already registered
        const alreadyRegisterUser = await User.findOne({
            $or: [
                { name: name },
                { email: email }
            ]
        });

        if (alreadyRegisterUser) {
            const error = {
                heading: "User already has an account",
                paragraph: "We encountered that you already have an account. Try login",
                name:login,
                link:"/login"
            };

            return res.render("errorM.ejs", { error,user:null });
        }


    if(!avatarPath){
        const error={
            heading:"Avatar is Required" ,
            paragraph:" Please fill the form correctly and submit again" 
        }
        return res.render("errorM.ejs",{error})
       
        }
        // const avatarpath=avatar?.path
        const avatarlink= await uploadoncloudinary(avatarPath)
        
      
        const coverImageLink = coverImagePath ? await uploadoncloudinary(coverImagePath) : null;

        const avatarUrl=avatarlink?.url
        const user=await User.create({
            name,
            email,
            password,
            avatar:avatarUrl,
            coverImage:coverImageLink?coverImageLink.url:null,
            address,
            profession,
            DOB,
            bio
        })
        if(!user){
            // const error="no such user try signin"
            // res.render('login.ejs',{error})

            const error={
                heading:"internal server error" ,
                paragraph:"" 
            }
           
        
        }
      
        return res.redirect("/homepage")

    }
    catch(err){
        const error={
            heading:err ,
            paragraph:" some thing went wrong" 
        }
        const user =req.user?req.user:null
        return res.render("errorM.ejs",{error:err,user})

    }
})

const handlerUserlogin=asynchandler(async(req,res,next)=>{

    try{

        const {email,name,password}=req.body
        
        const user=await User.findOne({email,name})

        
      

        if(!user){
            // res.render('/login')
            // throw new Error("no user  sign in required")
                const error="incorrect user or password ,please try with correct user and password"
            res.render('login.ejs',{error})
        }
        const userPass=await user.isPasswordCorrect(password)


        if(!userPass){
            const error={
                heading:"wrong password ",
                paragraph:" try again with right one" 
            }

            return res.render("errorM.ejs",{error,user})
         }
        // const username=user.name;
     
     
        
     
      
        const sesionid=uuidv4()
        
        setUser(sesionid,user)

        


        // const texts=await Text.find({}).populate('owner')
      
        res.cookie("userid",sesionid,{
            httpOnly:true,
            secure:true
           })

        return res.render("homepageM.ejs",{user})
  

    }
    catch(err){
      
        const error={
            heading:err ,
            paragraph:" something went wrong while logging in" 
        }
        const user=req.user?req.user:null

        return res.render("errorM.ejs",{error,user})
    }
})


const handleUserLogOut=asynchandler(async(req,res)=>{
    const user=req.user

   try {
     // const user=req.cookies?._id
     
     // if(!user){return new Error(404,"no such user") }
     
     const options={
         httpOnly:true,
         secure:true,
         sameSite: 'strict',
         path: '/', 
     }
  res.clearCookie("userid",options)
   
     return res.redirect('/homepage')
    
 }
    catch (err) {
        const error={
            heading:err ,
            paragraph:" something went wrong while logging out" 
        }

        return res.render("errorM.ejs",{error:err,user})
    
   }
})
 
const handleUpdateUser=asynchandler(async(req,res)=>{
// 
const user=req.user


    const userId = req.params.id;
    const updates = { ...req.body };
  
    if (req.file) {
      if (req.file.fieldname === 'avatar') {
        updates.avatar = `/uploads/${req.file.filename}`;
      } else if (req.file.fieldname === 'coverImage') {
        updates.coverImage = `/uploads/${req.file.filename}`;
      }
    }
  
    try {
      // Find the user by ID and update the fields
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
         const error={
            heading:"No user found" ,
            paragraph:" something went wrong while updating user" 
        }

        return res.render("errorM.ejs",{error:err,user})
      }
  
  return res.redirect('/')
    } catch (err) {
        const error={
            heading:err ,
            paragraph:" something went wrong while logging out" 
        }

        return res.render("errorM.ejs",{error:err,user})
    }
  }

)





const contactForm=asynchandler(async(req,res)=>{
    const user =req.user
    
    const {name,email,message}=req.body
    if(!(name||email||message)){
        const error={
            heading:"plz send valid message" ,
            paragraph:"We found the technical message in your Contact Form" 
        }
        return res.render("errorM.ejs",{error,user})
      
    }
    
    const question=await  Question.create({
        name,
        email,
        message,
        user:user?user._id:null

    })
    const populateUser=await  Question.find({user:user._id}).populate('user')


   if(!question) {
    const error={
        heading:"bad request" ,
        paragraph:" error invalid question" 
    }
    return res.render("errorM.ejs",{error,user})
    
   }
   if(!populateUser) {
    const error={
        heading:"bad request" ,
        paragraph:"error in pupulated user" 
    }
    return res.render("errorM.ejs",{error})
    
   }
   

  
   return res.redirect('/contact')

})

export {handlerUserSignup,handlerUserlogin,handleUserLogOut,contactForm,handleUpdateUser}