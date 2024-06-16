const express = require("express");
const connectToDb = require("./config/connectToDb");
require("dotenv").config();
const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const passwordRoute = require("./routes/passwordRoute");
const xss = require("xss-clean");
const helmet = require("helmet");
const hpp = require("hpp");
const rateLimiting = require("express-rate-limit");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const cors = require("cors");

// connection to DB
connectToDb();
// Init App
const app = express();
// Middlewares
app.use(express.json());
// Headers Security (helmet)
app.use(helmet());

// Prevent HTTP Parameter Pollution (HPP)
app.use(hpp());

// Cors Policy
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// Rate Limiting
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200,
  })
);
// Prevent XSS(Cross Site Scripting) Attacks
app.use(xss());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/password", passwordRoute);
// Error Handlers
app.use(notFound);
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
