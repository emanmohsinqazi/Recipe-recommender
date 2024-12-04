const express=require('express')
const app=express();
require('dotenv').config();
const PORT= process.env.PORT;

app.get('/',(req,res)=>{
    res.send("This is the Smart Recipe Grocer")
})

app.listen(PORT,()=>{
    console.log(`App is listening at PORT: ${PORT}`);
})