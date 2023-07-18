const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", function(req, res) {
  const email = req.body.email;

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && email.match(emailRegex)) {
    res.render("success", { email: email }); // Load success.ejs with no error message
  } else {
    res.render("failure", { error: "Valid email address required" }); // Load success.ejs with an error message
  }
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
