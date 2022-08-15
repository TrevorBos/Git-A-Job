const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// Database connection
const db = require("./config/database");

// Test the database
db.authenticate()
  .then(() => console.log("Database has been connected!"))
  .catch((err) => console.log("Here is the error" + err));

const app = express();

// HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.send("INDEX"));

// Job routing
app.use("/jobs", require("./routes/jobRoutes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
