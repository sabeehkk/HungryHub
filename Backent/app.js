import "dotenv/config";
import bodyParser from "body-parser";
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./config/config.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import restaurentRouter from "./routes/restaurentRoutes.js";
import employeeRouter from "./routes/employeeRoutes.js";
import http from "http";
import { Server } from "socket.io";
import configureSocket from "./config/socket.js";

dbConnect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://main--celadon-malabi-0333d8.netlify.app",
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      callback(null, origin === "https://main--celadon-malabi-0333d8.netlify.app");
    },
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Check if the socket is connected
  if (socket.connected) {
    console.log("Socket is connected");
  } else {
    console.log("Socket is not connected");
  }
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("sentMessage", async () => {
    console.log(
      "Connection is on-------------------------------------------------------------"
    );
    io.emit("receiveMessage");
  });
});

app.use(express.static("public"));

app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/restaurent", restaurentRouter);
app.use("/employee", employeeRouter);

const PORT = process.env.PORT ?? 4000;
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
