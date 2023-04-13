
const express = require('express');
const mongoose = require('mongoose');
 
const  {v4} = require('uuid');


const Router = express.Router();


//------sheama--------------------------------
 
const scheduleSchema = new mongoose.Schema({
    scheduleUid:String, 
    busNumber:Number, 
    timings :String,
    startingPoint:String
})


//-----models--------------------------------
 const busSheduleModel=mongoose.model("schedule",scheduleSchema)

 
 


//-----------add schedule data-----------------------------------------------------

Router.post("/api/addscheduledata",(req, res)=>{

    const data = req.body;
    data.scheduleUid = v4();

    const busDocument = new busSheduleModel(data);
    busDocument.save().then((scheduleData)=>{
        res.send(scheduleData)
        console.log(scheduleData);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);

    });
      
  
  
});
//---------get one schedule data-------------------------------------------------------


Router.post("/api/one/scheduledata", (req, res) => {
    busSheduleModel.findOne({scheduleUid:req.body.scheduleUid}).then((data)=>{
      
        res.send(data)     
        console.log(data)   
    
      
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    });
});
//---------get all schedules data -------------------------------------------------------

Router.get("/api/all/schedulesdata",function(req,res){
    busSheduleModel.find({}).then((data)=>{
            
        res.send(data);
        console.log(data)
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})

//----------udate busnumber------------------------------------------------------
Router.put("/api/update/schedule/busnumber",function(req,res){
    busSheduleModel.findOneAndUpdate({scheduleUid:req.body.scheduleUid},{busNumber:req.body.busNumber}).then((data)=>{
            
        console.log({status: true,message:"busnumber updated successfully"})
       res.send({status: true,message:"busnumber updated successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})

//----------udate timings------------------------------------------------------
Router.put("/api/update/schedule/timings",function(req,res){
    busSheduleModel.findOneAndUpdate({scheduleUid:req.body.scheduleUid},{timings:req.body.timings}).then((data)=>{
            
        console.log({status: true,message:"timings updated successfully"})
       res.send({status: true,message:"timings updated successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})
//----------udate startingPoint------------------------------------------------------
Router.put("/api/update/schedule/startingPoint",function(req,res){
    busSheduleModel.findOneAndUpdate({scheduleUid:req.body.scheduleUid},{startingPoint:req.body.startingPoint}).then((data)=>{
            
        console.log({status: true,message:"startingPoint updated successfully"})
       res.send({status: true,message:"startingPoint updated successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})

 
//----------delete startingPoint------------------------------------------------------
Router.delete("/api/delete/scheduledata",function(req,res){
    busSheduleModel.findOneAndDelete({scheduleUid:req.body.scheduleUid}).then((data)=>{
            
        console.log({status: true,message:"scheduledata deleted successfully"})
       res.send({status: true,message:"scheduledata deleted successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})


module.exports = Router