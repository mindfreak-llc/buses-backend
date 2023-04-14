
const express = require('express');
const mongoose = require('mongoose');
const md5 = require('md5');
const  {v4} = require('uuid');


const Router = express.Router();


const Schema = new mongoose.Schema({
    userUid:String,
    userName:String,
    password:String,
    email:String,
    type:Number,
    salt:String,
})

const userModel=mongoose.model("user",Schema)
//------------------------------------------------------------------------------
// Router.use((req, res, next)=>{

//     if(req.url === '/login'|| req.url === '/register'){
//         next();
//     }else{
//        const authHeader = req.headers["authorization"];
      
//        if(authHeader){
//             const token = authHeader.split(' ')[1];
 
//             if(token){
//                 jwt.verify(token,secretkey,(err, decoded)=>{
//                     if(err){
//                         if(err&&err.message && err.message === "jwt expired"){
//                             res.status(500).json({error:"conflict",errorDescription:"token expired"})
//                         }else{
//                             res.status(500).json({errorDescription:"invalid token"})
//                         }
                     
//                     }else{
//                         req.user= decoded;
//                         next(); /// must ramesh
//                     }
//                 }) 
//             }else{
//                 res.status(401).json({errorDescription:" no token"})
//             }
//        }else{
//         res.status(401).json({errorDescription:"no authHeader"})
//        }
            

//     }
// }) 



Router.post("/api/user/register",(req, res)=>{

    const data = req.body;
    
    const salt =  (Math.random() + 1).toString(36).substring(7);
    const password =md5(data.password+salt)  
    
    data.userUid = v4();
    data.salt = salt;
    data.password = password;
   

    userModel.findOne({email: req.body.email}).then((user)=>{
        if(!user){
          
            const userDocument = new userModel(data);
            userDocument.save().then((registeredData)=>{
                res.send(registeredData)
                console.log(registeredData);
            }).catch(err=>{
                console.log(err);
                res.status(500).send(err);
        
            });
        }else{   
            res.status(409).json({staus:"email id already exist"})
            console.log(data);
        }
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send(err);
    })
  
  
});
Router.post("/api/user/login", (req, res) => {
    userModel.findOne({email:req.body.email}).then((user)=>{
       if(user){
            const password = md5(req.body.password+user.salt);
            if(password === user.password){

                // const token = jwt.sign({name:user.name,email:user.email,number:user.number,uuid:user.uuid},secretkey,{expiresIn:'1h'})
                // res.status(200).json({token:token,data:user})
                res.status(200).json({status:"success",message:"login successful" })     
                console.log({status:"success",message:"login successful" })   
            }else{
                res.status(401).json({errorDescription:"wrong password"})
                console.log("wrong password")
            }
       }else{
        res.status(401).json({errorDescription:"email not exist"})
        console.log("email not exist")
       }
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    });
});

Router.get("/api/users",(req,res)=>{
    userModel.find({}).then((data)=>{
            
          res.send(data);
          console.log(data)
        }
        ).catch((error)=>{
          
          console.log({status: false,message:error.message})
         res.send({status: false,message:error.message}) 
        })
})


//----------update userName------------------------------------------------------
Router.put("/api/update/userName",(req,res)=>{
    userModel.findOneAndUpdate({userUid:req.body.userUid},{userName:req.body.userName}).then((data)=>{
            
        console.log({status: true,message:"userName updated successfully"})
       res.send({status: true,message:"userName updated successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})

//----------update password------------------------------------------------------
Router.put("/api/update/password",(req,res)=>{
    userModel.findOneAndUpdate({userUid:req.body.userUid},{password:req.body.password}).then((data)=>{
            
        console.log({status: true,message:"password updated successfully"})
       res.send({status: true,message:"password updated successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})
//----------update email------------------------------------------------------
Router.put("/api/update/userName",(req,res)=>{
    userModel.findOneAndUpdate({userUid:req.body.userUid},{email:req.body.email}).then((data)=>{
            
        console.log({status: true,message:"email updated successfully"})
       res.send({status: true,message:"email updated successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})
//----------update type------------------------------------------------------
Router.put("/api/update/type",(req,res)=>{
    userModel.findOneAndUpdate({userUid:req.body.userUid},{type:req.body.type}).then((data)=>{
            
        console.log({status: true,message:"type updated successfully"})
       res.send({status: true,message:"type updated successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})

//----------delete userdata------------------------------------------------------
Router.delete("/api/delete/busdata",(req,res)=>{
    userModel.findOneAndDelete({userUid:req.body.userUid}).then((data)=>{
            
        console.log({status: true,message:"userdata deleted successfully"})
       res.send({status: true,message:"userdata deleted successfully"})
      }
      ).catch((error)=>{
        
        console.log({status: false,message:error.message})
       res.send({status: false,message:error.message}) 
      })
})

module.exports = Router