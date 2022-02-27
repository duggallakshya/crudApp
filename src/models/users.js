const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        console.log("prev"+"  "+ this.password);
        this.password = await bcrypt.hash(this.password,10);
        console.log("new"+"  "+ this.password);
 
    }
    next();
    
})
const User = new mongoose.model("User",userSchema);

module.exports = User;