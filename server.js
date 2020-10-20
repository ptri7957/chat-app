const express = require("express");

const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const messages = require("./routes/api/messages");

const app = express();

const port = process.env.PORT || 5000;
const server = app.listen(port, console.log(`Server is running at ${port}`));
const io = require("socket.io")(server);

// Connect to DB
const connectDB = require("./config/db");
connectDB();

// Parse request formats
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pass io to every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Mount routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/messages", messages);

