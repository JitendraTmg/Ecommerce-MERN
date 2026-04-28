import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./dbConfig/db.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

configDotenv();

const app = express();


// Enable CORS for development
app.use(
  cors({
    origin : "http://localhost:5173"
  }));

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use('/uploads', express.static('uploads'));




const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
