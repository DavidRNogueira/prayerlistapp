const express = require("express");
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const church = require("./churchModel")
const moment = require("moment")
const Schema = mongoose.Schema

app.use(express.json());
app.use(express.static(path.join(__dirname ,"prayerlist" , "build")))

mongoose.connect('mongodb://localhost/test' , {useNewUrlParser : true , useUnifiedTopology: true })
.catch( error => {
    console.log(error)
})

mongoose.connection.once("open" , () => {
    console.log("Connnection made!")
}).on("error" , (error) => {
    console.log(error)
})
app.get("*" , (req , res) =>{
    res.sendFile(path.join(__dirname ,"prayerlist" , "build" , "index.html"));
})

//Church API
app.post("/create-church" , (req , res) => {
    const {churchName , churchParams} = req.body;
    const newChurch = new church ({
        churchName ,
        churchParams,
        prayerRequests : []
    })
    newChurch.save().then(console.log("Success"));
})

app.get("/get-church" , (req , res) => {
    const churchInDb = church.findOne({churchParams : req.body});
    console.log(churchInDb)
})

//Prayer API
app.post("/add-prayer" , (req , res) => {
    const {reporter , description , churchId} = req.body
    church.findOneAndUpdate(
        {_id: churchId} ,
        {$push : {prayerRequests : { reporter , description , date_posted: moment().format(), prayerCount: []}}}
    )
    .then(console.log("Update success!"))
})

app.listen(8000);
