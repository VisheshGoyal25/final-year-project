const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes=require("./routes")
const cors=require("cors")
const passportSetup = require("./routes/passport");
dotenv.config();
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log("DB connected Successfully")})
.catch((err)=>{console.log("Error while connecting to DB: ",err)})


app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
    credentials: true,
    })
  );
  

app.use(express.json());
if(process.env.NODE_ENV=="production")
{
  app.use(express.static("client/build"))
  const path=require("path")
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","build,index.html"));
  })
}
app.use('/',routes)
app.listen(process.env.PORT||5000,()=>{
    console.log("listening on server:",process.env.PORT)
})
