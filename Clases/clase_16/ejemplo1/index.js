import userModel from "./models/users_model.js";
import mongoose from "mongoose";
import { usersArray } from "./users.js";

const environment = async ()=>{
   console.log(usersArray)

    await mongoose.connect('mongodb+srv://bardaleshector41:asd.456@cluster0.jobsexj.mongodb.net/?retryWrites=true&w=majority')
    //await userModel.insertMany(usersArray)
     //let response = await userModel.find().explain('executionStats')//first query
     let response = await userModel.find({first_name: 'Celia'}).explain('executionStats')//first query
    console.log(response)
}

environment()