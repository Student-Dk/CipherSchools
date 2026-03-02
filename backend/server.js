import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import sqlRoutes from "./routes/sqlRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import schemaRoutes from "./routes/schemaRoutes.js";


connectDB();

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/api/assignments", assignmentRoutes);


app.use("/api/auth", authRoutes);



app.use("/api/sql", sqlRoutes);



app.use("/api/schema", schemaRoutes);

app.use("/api/gemini", geminiRoutes);

app.get("/", (req, res) => {
  res.send("CipherSQLStudio Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});