 const express = require("express")
 const cors = require("cors")
 const nodemailer = require("nodemailer");
 const mongoose = require("mongoose")

 const app = express()
 app.use(cors())
 app.use(express.json())

 mongoose.connect("mongodb+srv://ram:123@cluster0.odz3ojp.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function(){
    console.log("connected to db")
 }).catch(function(){
    console.log("failed to connect")
 })

const credential = mongoose.model("credential", {} , "bulkmail")





app.post("/sendemail", function(req,res){
    var msg = req.body.msg;
    var emailList = req.body.emailList

    credential.find().then(function(data){
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: data[0].toJSON().user,
    pass: data[0].toJSON().pass,
  },
});

 new Promise(async function(resolve,reject){

    try{
        for(var i=0 ; i<emailList.length; i++)
         {
           await transporter.sendMail(
    {
        from:"124176077@sastra.ac.in",
        to:emailList[i],
        subject:"Msg from bulkmail app",
        text:msg
    }
    )
    console.log("Email sent to:" +emailList[i])

    }
    resolve("success")

    }
    catch(error){
        reject("Failed")
    }

    }).then(function(){
        res.send(true)
    }).catch(function(){
        res.send(false)
    })

}).catch(function(error){
    console.log(error)
 })

})

 app.listen(5001,function(){
    console.log("server started.....")
 })