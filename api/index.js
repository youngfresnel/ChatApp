const express = require ("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require ("cors");

dotenv.config();

const PORT = 3000;

const allowedOrigins = "http://localhost:3000"

const app = express();
app.use(express.json());
app.use(cors({origin:allowedOrigins,credentials:true}))


mongoose.connect("mongodb+srv://youngfresnel:mongofresnel@cluster0.pcu2jmy.mongodb.net/")
.then(() => console.log ("Connected To MongoDB"))
.catch (err => console.error("MongoDB Connection error",err))

app.listen(PORT, () => console.log("Server running on port 3000"))