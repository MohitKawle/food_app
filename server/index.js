const express = require('express');
const mongoose = require('mongoose');
const {connection}=require("./connection/db.js")
const app = express();
const PORT = process.env.PORT || 8080;
const cors=require("cors");


//models
const UserModel=require("./model/user.model.js");
const FavouriteModel=require("./model/favourite.model.js");


//routes
const userRouter = require("./Routes/user.route.js");
const dishesRouter=require("./Routes/dishes.route.js");
const favouriteRouter=require("./Routes/favourite.route.js")



//middlewares
app.use(express.json());
app.use(cors())




//endpoints
app.get('/',(req,res)=>{res.end('Welcome to food app')});
app.use("/user",userRouter);
app.use("/recipes",dishesRouter);
app.use("/favourite",favouriteRouter)


// Start the server
app.listen(PORT, async() => {
    try {
      await connection;
      console.log("Listening",PORT);
      
  } catch (error) {
      console.log("\n-----------------error-----------------\n",error)
  }
  
  });
