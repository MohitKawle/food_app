const {Router}=require("express");
const userModel = require("../model/user.model")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {getTokenFromReq} =require('../utility/getTokenFromReq');
const {getEmailFromToken} =require("../utility/getEmailFromToken");






//Router
const dishesRouter=Router();

dishesRouter.get("/complexSearch",async(req,res)=>{
    let url= `https://api.spoonacular.com/recipes/complexSearch?apiKey=f1555ed57fbe410898af05f391a9a82e&`

    let { query,cuisine} =req.query
    if(cuisine!=undefined &&  cuisine.length>0){url+=`cuisine=${cuisine}`}
    else if(query!=undefined && query.length>0){url+=`query=${query}`}
    // console.log(url)
   
   try {
    let data=await fetch(url)
    data=await data.json();
    // console.log(data)
     return res.send(data)
   } 
   catch (error) {
        return res.send('some error occured')
   }
});
 
 



dishesRouter.get("/:id/information",async(req,res)=>{
    const recipeId = req.params.id;
    const url=`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=f1555ed57fbe410898af05f391a9a82e`

    try {
        let data=await fetch(url)
        data=await data.json();
        // console.log(data)
         return res.send(data)
       } 
       catch (error) {
            return res.send('some error occured')
       }

    });
 






module.exports=dishesRouter