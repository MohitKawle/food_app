const favouriteModel=require('../model/favourite.model');
var jwt = require('jsonwebtoken');

const {Router}=require("express");


const favouriteRouter=Router();

favouriteRouter.get('/alldishes',async (req,res)=>{
    let token= req.headers?.authorization?.split(" ")[1];
    let decoded= jwt.verify(token,process.env.SECRET)
    try {
        let data=await favouriteModel.findOne({"email":decoded.email});
        return res.send(data.dishes)
        
    } catch (error) {
        return res.send(error)
    }



})

//  headers: {Authentication: 'Bearer {token}'}
favouriteRouter.post('/addDish',async (req,res)=>{

    let token= req.headers?.authorization?.split(" ")[1];

    let decoded= jwt.verify(token,process.env.SECRET)
    console.log(decoded.email)

    let filter={email:decoded.email}
    let update={ $push: { dishes: req.body } };

    favouriteModel.findOneAndUpdate(filter, update, { new: true })
    .then(updatedDocument => {
        if (updatedDocument) {
            console.log('-------------------');
            return res.end("done")
        } else {
            console.log("Document not found.");
        }
    })
    .catch(error => {
        console.error(error);
    });

});

module.exports=favouriteRouter