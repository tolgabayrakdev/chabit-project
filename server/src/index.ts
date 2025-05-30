import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import authRoutes from './routes/auth-routes';

const app = express();
const port = process.env.PORT || 1234;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});