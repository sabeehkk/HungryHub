import "dotenv/config";
import mongoose from "mongoose";
function dbConnect() {
  const url = process.env.DATABASE;
  mongoose
    .connect(url)
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));
}
export default dbConnect;
