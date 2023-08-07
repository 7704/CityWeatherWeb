const express = require("express");
const app = express();
const hbs = require("hbs");

// const port = process.env.PORT || 3000 ; ("use of enviornment variable which is used while hosting")

const port = 8000;

// fetching static files to express application
app.use(express.static("public"));

// using views directory by removing html files as used earlier
app.set("view engine", "hbs");

// using partials directory by changing views directory path
app.set("views", "templates/views");
hbs.registerPartials("templates/partials");

// routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("*", (req, res) => {
  res.render("404page", {
    errmsg: "Oops!!! Page not found...😲",
  });
});

app.listen(port, () => {
  console.log(`Server started to listen on port ${port}`);
});
