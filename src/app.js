const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const User = require("./models/usermessage");

const app = express();
const port = process.env.PORT || 3000;

//Setting The Path
const staticPath = path.join(__dirname , "../public");
const templatePath = path.join(__dirname , "../templates/views");
const partialPath = path.join(__dirname , "../templates/partials");

//MiddleWare
app.use("/css" , express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js" , express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq" , express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));
app.set("view engine" ,"hbs");
app.set("views" , templatePath);
hbs.registerPartials(partialPath);
//Routing
app.get("/" , (req , res) =>{
    res.render("index");
});
app.get("/contact" , (req , res) =>{
    res.render("contact");
});
app.post("/contact" , async(req , res)=>{
    try {
        // res.send(req.body);
        const userData = await new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get("/" , (req , res) =>{
    res.send("Welcome to home Page");
});

//Server Create 
app.listen(port , ()=>{
    console.log(`Server Is Running At Port No:${port}`);
});