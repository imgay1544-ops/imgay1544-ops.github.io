import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

let users = JSON.parse(fs.readFileSync("users.json"));

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: "User not found" });
  if (user.password !== password) return res.status(401).json({ error: "Wrong password" });
  res.json({ success: true });
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
