import express from "express";
import cors from "cors";
import { connectDB } from "./database"; 
import userRoutes from "./routes/user.routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

connectDB(); 

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
