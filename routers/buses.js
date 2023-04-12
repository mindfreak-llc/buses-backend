
const express = require('express');
const mongoose = require('mongoose');
 
const  {v4} = require('uuid');


const Router = express.Router();


const Schema = new mongoose.Schema({
    busUid:String, 
    latitude :Number,
    longitude:Number,
})

const busModel=mongoose.model("buse",Schema)
 



Router.post("/api/addbusdata",(req, res)=>{

    const data = req.body;
    data.busUid = v4();

    const busDocument = new busModel(data);
    busDocument.save().then((busdata)=>{
        res.send(busdata)
        console.log(busdata);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);

    });
      
  
  
});


Router.post("/api/one/bus", (req, res) => {
    busModel.findOne({busUid:req.body.busUid}).then((data)=>{
      
        res.send(data)     
        console.log(data)   
    
      
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    });
});

Router.get("/api/all/buses",function(req,res){
    busModel.find({}).then((data)=>{
            
        res.send(data);
        console.log(data)
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})

module.exports = Router