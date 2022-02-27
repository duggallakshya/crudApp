const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");
const path = require("path" );
const hbs = require("hbs");
const Users = require("./models/users"); 
const bcrypt = require("bcryptjs");

const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")
// console.log(static_path);  
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.get("/",(req,res) => {
    res.render("index");
})

app.get("/users",async(req,res) => {
    try{
        const result = await Users.find();
        res.status(200).send(result);
    }catch(err){
        res.status(400).send(err);
    }
    
})

app.post("/users", async(req,res) => {
    try{
        const userData = new Users(req.body);
        const result =  await userData.save();
        res.status(201).send(JSON.parse(JSON.stringify(result)));
    }catch(err){
        res.status(400).send(err);
    }
})

app.get("/getByName",(req,res) => {
    res.render("getByName");
})

app.post("/getByName", async(req,res) => {
    try{
        const name = req.body.name;
        const result = await Users.find({name:name});
        if(result.length!=0){
            res.status(200).send(result);
        }else{
            res.status(200).send("No user corresponding to the given name");
        }
        
    }catch(err){
        res.status(400).send(err);
    }
})

app.get("/registerNew",(req,res) => {
    res.render("registerNew");
})

app.get("/editById",(req,res) => {
    res.render("editById");
})

app.post("/editById",async(req,res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const id = req.body.id;
        const result = await Users.findByIdAndUpdate(id,{
            name: name,
            email: email,
            phone: phone
        },{
            new: true
        })
        res.status(200).send(result);
    }catch(err){
        res.status(400).send(err);
    }
    
})

app.get("/delById",(req,res) => {
    res.render("delById");
})

app.post("/delById",async(req,res) => {
    try{
        const id = req.body.id;
        const result = await Users.findByIdAndDelete(id);
        res.status(200).send(result);
    }catch(err){
        res.status(400).send(err);
    }
})


// app.post("/register",async(req,res) => {
//     try{
//         const regEmp = new Register(req.body);
//         //hash password
        
//         const result = await regEmp.save();
//         res.status(201).render("index");
//     }catch(er){
//         res.status(400).send(er);
//     }
// })

// app.post("/login",async(req,res) => {
//     try{
//         const email = req.body.email;
//         const password = req.body.password;
        
//         const result = await Register.findOne({email:email});
//         const isMatch = await bcrypt.compare(password,result.password);
//         console.log(isMatch);
//         if(isMatch){
//             res.status(201).render('index');
//         }
//         else{
//             res.status(400).send("invalid login details");
//         }
        
//     }catch(er){
//         res.status(400).send(er);
//     }
// })

// const bcrypt = require("bcryptjs");

// const securePassword = async(password) => {

//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);

//     const passwordMatch = await bcrypt.compare("lakshya123", passwordHash);
//     console.log(passwordMatch);
// }

// securePassword("lakshya123") 

// const jwt = require("jsonwebtoken");

// const createToken = async() => {
//     const token = await jwt.sign({_id:"6218f17a1940c07aa7f5b442"}, "secretkey",{
//         expiresIn: "2 seconds"
//     });
//     console.log(token);

//     const usrVer = await jwt.verify(token, "secretkey");
//     console.log(usrVer);
// }

// createToken();

app.listen(port, () => {
    console.log("server running on port "+port);
  })