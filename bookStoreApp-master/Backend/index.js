import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4001;
const URI = process.env.MongoDBURI;

if (!URI) {
    console.error("CRITICAL ERROR: MongoDBURI environment variable is missing!");
}

// connect to mongoDB
try {
    await mongoose.connect(URI);
    console.log("Connected to mongoDB successfully");
} catch (error) {
    console.error("FAILED to connect to mongoDB:", error.message);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
    });
});

// Serve frontend static files
const __dirname = path.resolve();
const frontendDistPath = path.join(__dirname, "../Frontend/dist");
console.log("Serving static files from:", frontendDistPath);

app.use(express.static(frontendDistPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log("Current working directory:", process.cwd());
});