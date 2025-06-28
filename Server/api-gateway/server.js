import express,{urlencoded} from "express";
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import proxy from "express-http-proxy";


app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));


app.get('/',(req,res) => {
    res.send("this is api gateway");
})
app.use('/user',proxy('http://localhost:3001'));
app.use('/ride',proxy('http://localhost:3002'));


app.listen(process.env.PORT,() => {
    console.log("gateway running on port : ",process.env.PORT);
})