const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/news_portal_db",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connection sucessfull");
}).catch((err)=>{
    console.log(err);
})
