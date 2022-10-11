import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/user.js";
import tasksRoute from "./routes/task.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const createConnection = async () => {
  await mongoose.connect(MONGO_URL);
  console.log("mongoose is connected");
};

app.listen(PORT, () => {
  createConnection();
  console.log(`server is listening on ${PORT}`);
});

app.get("/", async (req, res) => {
  await res.send("Hello world");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/tasks", tasksRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
