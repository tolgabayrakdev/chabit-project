import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

import authRoutes from './routes/auth-routes';
import decisionRoutes from './routes/decision-routes';

const app = express();
const port = process.env.PORT || 1234;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.use('/api/auth', authRoutes);
app.use('/api/decisions', decisionRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});