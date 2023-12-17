import "dotenv/config";
import bodyParser from "body-parser";

import express, { json } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dbConnect from './config/config.js';
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import restaurentRouter from './routes/restaurentRoutes.js'
import employeeRouter from './routes/employeeRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import http from 'http';
import {Server} from 'socket.io'
// import configureSocket from './config/socket.js'
import configureSocket from './config/socket.js';

dbConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

const server =http.createServer(app)
const io = new Server(server,{
  cors: {
    origin: 'http://localhost:3001',
    credentials: true,
  }
})

configureSocket(io)

app.use(express.static('public'))


app.use('/',userRouter)
app.use('/admin',adminRouter)  
app.use('/restaurent',restaurentRouter)
app.use('/employee',employeeRouter)  
app.use('/chat',chatRouter)  
app.use('/messsage',messageRouter)   


const PORT = process.env.PORT ?? 4000;
app.listen(PORT ,()=>{
    console.log(`Example app listening on port ${PORT}`);
})