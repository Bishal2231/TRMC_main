import express from "express"
import { DBCONNECT } from "./db/db.js";
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import { upload } from "./middleware/multer.js";
import {getUser} from "./utils/cokkie.js"
import { verfiyUserLogin } from "./middleware/auth.co.js";
import {uploadoncloudinary} from "./utils/uploadoncloudinary.js"
import {contactForm} from "./controller/user.controller.js"
import {Text} from "./models/text.js"
import {Question} from  "./models/contact.model.js"
import cors from "cors"
import {checkAdmin} from "./middleware/admin.check.js"
import path from 'path';
import { User } from "./models/user.model.js";
import { Event } from "./models/event.model.js";
import {handleUpdateUser,handleUserLogOut,handlerUserlogin,handlerUserSignup} from "./controller/user.controller.js"
import { contact, notice, textIdPost,textid ,news, eventPostGet,profileIdPost} from "./controller/pages.controller.js";


import { isuserlogin,userlogged } from "./middleware/userlogged.check.js";







const app=express()
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json()); 
app.use(cookieParser())
app.use(cors())
// const port=process.env.port|| 4000;
const port=process.env.PORT||3001;
DBCONNECT().then(()=>{

   

    app.listen(port,()=>{
        console.log(`server is running on http://localhost:${port}`)
    })}

).catch((err)=>{
    process.exit(1)

})




app.get('/',(req,res)=>{
    res.redirect("/homepage")
})

app.get('/homepage',userlogged,(req,res)=>{
    const user=req.user?req.user:null;
    res.render("homepageM.ejs",{user})
})



app.get('/notice',userlogged,notice)

app.get('/admission',userlogged,(req,res)=>{
    const user=req.user?req.user:null
    res.render("admissionM.ejs",{user})
})

app.get('/news',userlogged,news)
app.get('/contact',userlogged,(req,res)=>{
    const user=req.user?req.user:null;
    res.render("contactM.ejs",{user})
})

app.get('/signup',(req,res)=>{
    const user=req.user?req.user:null
    res.render("signup.ejs",{error:null,user})
})

app.get('/login',(req,res)=>{
    const user=req.user?req.user:null

    res.render("login.ejs",{error:null,user})
})

app.get('/profile/:id',async(req,res)=>{
    const {id}=req.params
    const user=await User.findById(id)
   res.render("profileM.ejs",{user})
})
app.get('/contacts/:id',userlogged,checkAdmin,contact)

app.post('/signup',upload.fields([{name:'avatar',maxCount:1},{name:'coverImage',maxCount:1}]),handlerUserSignup)
app.post('/login',handlerUserlogin)

 app.post('/contact/:id',isuserlogin,contactForm)
 app.post('/logout',isuserlogin,handleUserLogOut)

app.get('/text/:id',userlogged,checkAdmin,textid)
app.post('/text/:id',userlogged,checkAdmin,upload.single('photo') ,textIdPost)

app.get('/event/post',userlogged,checkAdmin,(req,res)=>{
   const user=req.user?req.user:null

   if(!user){
    res.redirect('/homepage')
   }
    res.render("eventForm.ejs",{user})
})

app.post('/event/post',userlogged,checkAdmin,upload.single('image'),eventPostGet )

app.get('/profile/:id/posts',userlogged,profileIdPost)

app.get('/user/update/:id',async(req,res)=>{
    const id=req.params.id
const user=await User.findById(id)
res.render('updateUser.ejs',{user})

})

app.post('/user/update/:id',userlogged, upload.fields([{ name: 'avatar' }, { name: 'coverImage' }]), handleUpdateUser);



