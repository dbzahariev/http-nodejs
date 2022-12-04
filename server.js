// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const axios = require('axios');
const { clearInterval, setInterval } = require("timers");

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const routes = require("./routes/api");
const routesChat = require("./routes/chat")

require("dotenv").config();

// Step 2
let newUrl =
  "mongodb+srv://ramsess90:Abc123456@cluster0.ewmw7.mongodb.net/db1?retryWrites=true&w=majority";
let oldUrl = "mongodb://localhost/mern_youtube";

if (process.env.MONGODB_URI === undefined) {
  console.log("Not found DB (process.env.MONGODB_URI)!");
}

mongoose.connect(process.env.MONGODB_URI || newUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Timer
let times = 1
function bb() {
  axios.get("https://dworld.onrender.com/api/users")
    .then((response) => {
      console.log('Triger awake', times)
      if (times === 9000) {
        clearInterval(timer)
      }
      times += 1
    })
    .catch((err) => {
      console.log("Unable to fetch -", err.message);
    });
}
const timer = setInterval(bb, 600 * 1000);

// HTTP request logger
app.use(morgan("tiny"));
app.use("/api", routes);
app.use("/chat", routesChat);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
