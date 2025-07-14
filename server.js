const express=require("express");
const app=express();
const db=require("./models");
const userRouter=require("./routers/user_routers");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/",userRouter);

db.sequelize.sync().then(()=>{
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })});