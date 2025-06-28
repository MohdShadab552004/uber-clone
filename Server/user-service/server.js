import express, { urlencoded } from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import router from './routes/home.js';
import connectDB from './db/db.js'; 
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';


//middleware
app.use(cors());
app.use(express.json())
app.use(urlencoded({ extended: true }));
app.use(cookieParser())

//db connect
connectDB(); 
 
//routes
app.get('/',(req,res) => {
    console.log("hitting");
    for(let i=0;i<=100000000;i++){}
    res.status(200).json({message:"hello"})
})
app.use('/auth',userRoutes);


app.listen(process.env.PORT,() => {
    console.log("user service running on port : ",process.env.PORT)
})