import express from "express";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 1234;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express + TypeScript!");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});