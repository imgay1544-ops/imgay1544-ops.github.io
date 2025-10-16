import express from "express";
import fs from "fs";
import bcrypt from "bcryptjs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "users.json";
let users = fs.existsSync(USERS_FILE) ? JSON.parse(fs.readFileSync(USERS_FILE)) : [];

// Helper: save users
function saveUsers() {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// User registration
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if(users.find(u => u.username === username)) {
        return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const key = Math.random().toString(36).substr(2, 12).toUpperCase(); // Generate random key

    users.push({ username, password: hashedPassword, key, active: true });
    saveUsers();

    res.json({ success: true, key });
});

// Admin login (for panel access)
app.post("/admin-login", (req, res) => {
    const { password } = req.body;
    const ADMIN_PASSWORD = "supersecureadmin"; // Change to secure password

    if(password === ADMIN_PASSWORD) return res.json({ success: true });
    res.status(401).json({ error: "Unauthorized" });
});

// Admin get all users
app.get("/admin/users", (req, res) => {
    res.json(users.map(u => ({ username: u.username, key: u.key, active: u.active })));
});

// Admin create key for user
app.post("/admin/create-key", (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);
    if(!user) return res.status(404).json({ error: "User not found" });

    user.key = Math.random().toString(36).substr(2, 12).toUpperCase();
    user.active = true;
    saveUsers();
    res.json({ success: true, key: user.key });
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
