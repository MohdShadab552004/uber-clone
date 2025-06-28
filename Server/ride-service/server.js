import express from 'express'
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


app.get('/',(req,res) => {
    console.log("hitting ride")
    res.status(200).send("this is ride service")
})


app.listen(process.env.PORT,() => {
    console.log("ride service runnimg on port : ", process.env.PORT)
})