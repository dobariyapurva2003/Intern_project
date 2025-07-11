const mongoose = require("mongoose");
const usr_name = process.env.usr_name;
const passwd = process.env.passwd;

// mongoose.connect("mongodb://localhost:27017/news_portal_db",{//
    mongoose.connect(`mongodb+srv://${usr_name}:${passwd}@cluster0.fkdwyti.mongodb.net/`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connection sucessfull");
}).catch((err)=>{
    console.log(err);
})
