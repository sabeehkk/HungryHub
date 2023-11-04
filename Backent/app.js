import "dotenv/config";
import bodyParser from "body-parser";

import express, { json } from 'express';
import cors from 'cors'
import cookieParser from "cookie-parser";

import dbConnect from './config/config.js';
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import restaurentRouter from './routes/restaurentRoutes.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));


app.use(express.static('public'))

dbConnect();


app.use('/',userRouter)
app.use('/admin',adminRouter)  
app.use('/restaurent',restaurentRouter)

const PORT = process.env.PORT ?? 4000;
app.listen(PORT ,()=>{
    console.log(`Example app listening on port ${PORT}`);
})