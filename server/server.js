import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import 'dotenv/config';
import webRoute from "./routes/web.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDb();
await connectCloudinary();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.get("/", (req, res) => res.send("running"));
app.use("/api", webRoute);

app.listen(port, () =>{
    console.log(`server is running on http://localhost:${port}`);
})