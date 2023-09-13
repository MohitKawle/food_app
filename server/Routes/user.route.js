const {Router}=require("express");
const userModel = require("../model/user.model")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const favouriteModel=require('../model/favourite.model');







//Router
const userRouter=Router();

userRouter.post("/createAccount",async(req,res)=>{

try {
    const {password , email}=req.body
 
    bcrypt.hash(password, 8 ,async function(err, hash) {
         console.log(hash);
    if(!hash)
    {
     res.send({message:"Something went wrong"})
    }
    else{
     const Data=userModel({
         email,password:hash
        })
    const fav=favouriteModel({
        email,Data:[]
    })
        await Data.save()
        await fav.save()
        res.send({message:"Successfully Signed up"})
    }
 })
} catch (error) {
    console.log(error)
    return res.json({'message':'error'})
}
});
 
 



userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    if(email==null ||password==null){return (res.send("Invalid Credentials"))}
    
    let User=await userModel.findOne({email})      
    if(!User){return res.send({message:"Invalid Credentials"})}
   
    
    bcrypt.compare(password, User.password,function(err, data) {
        console.log(password,User.password,data)
        try {
            if(!data){return res.send({message:"Invalid Credentials"})}
            var token = jwt.sign({ email: email },process.env.SECRET);
           return res.send({message:"Login succesful",token})
        } catch (error) {
            res.send(err)
            
        }
       
        });
    })
 






module.exports=userRouter