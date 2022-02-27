const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lakshya:lakshya123@cluster0.z05xk.mongodb.net/UserDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection `);
})