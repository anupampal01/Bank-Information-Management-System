const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();


// Allow Netlify and local development
app.use(cors({
  origin: [
    "https://bank-information-management-system.netlify.app",
    "http://localhost:5173"
  ],
  credentials: true
}));
app.use(express.json());



app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/banks", require("./routes/bankRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


