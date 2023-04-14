
const express = require('express');
const mongoose = require('mongoose');
 
const  {v4} = require('uuid');


const Router = express.Router();


//------sheamas--------------------------------
const Schema = new mongoose.Schema({
    busUid:String, 
    latitude :Number,
    longitude:Number,
    lastOnline:Number,
})

 

//-----models--------------------------------
const busModel=mongoose.model("buse",Schema)
 
//-----bus data-----------------------------------------

Router.post("/api/addbusdata",(req, res)=>{

    const data = req.body;
    data.busUid = v4();
    data.lastOnline =Date.now();

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

Router.get("/api/all/buses",(req,res)=>{
    busModel.find({}).then((data)=>{
            
        res.send(data);
        console.log(data)
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})



//----------update latitude------------------------------------------------------
Router.put("/api/update/latitude",(req,res)=>{
    busModel.findOneAndUpdate({busUid:req.body.busUid},{latitude:req.body.latitude}).then((data)=>{
            
        console.log({status: true,message:"latitude updated successfully"})
       res.send({status: true,message:"latitude updated successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})

//----------update longitude------------------------------------------------------
Router.put("/api/update/longitude",(req,res)=>{
    busModel.findOneAndUpdate({busUid:req.body.busUid},{longitude:req.body.longitude}).then((data)=>{
            
        console.log({status: true,message:"longitude updated successfully"})
       res.send({status: true,message:"longitude updated successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})
 

//----------delete busdata------------------------------------------------------
Router.delete("/api/delete/busdata",(req,res)=>{
    busModel.findOneAndDelete({busUid:req.body.busUid}).then((data)=>{
            
        console.log({status: true,message:"busdata deleted successfully"})
       res.send({status: true,message:"busdata deleted successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})
module.exports = Router