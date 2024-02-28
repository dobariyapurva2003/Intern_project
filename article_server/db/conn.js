const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/news_portal_db",{//
    mongoose.connect("mongodb+srv://dpurva:Rspj200203@cluster0.fkdwyti.mongodb.net/",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connection sucessfull");
}).catch((err)=>{
    console.log(err);
})
