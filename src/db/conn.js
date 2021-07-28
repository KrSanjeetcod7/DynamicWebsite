const mongoose = require("mongoose");
//Creating A DataBase
mongoose.connect("mongodb://localhost:27017/sanjeetdynamic",{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then (()=>{
    console.log("Connection Is Successfull...");
}).catch ((error)=>{
    console.log(error);
})