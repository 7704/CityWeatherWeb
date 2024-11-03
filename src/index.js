const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/connect");
const Register = require("./models/register");

// const port = process.env.PORT || 3000 ; ("use of enviornment variable which is used while hosting")

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// fetching static files to express application
app.use(express.static(path.join(__dirname, "../public")));

// using views directory by removing html files as used earlier
app.set("view engine", "hbs");

// using partials directory by changing views directory path
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

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

app.get("/register", (req, res) => {
  res.render("register");
});

// using "async-await" to take data from "registerform or postman" & save it to mongodb
app.post("/register", async (req, res) => {
  try {
    const pswd = req.body.password;
    const cpswd = req.body.confirmpassword;
    if (pswd === cpswd) {
      // const registerEmployee = new Register({
      //   name: req.body.name,
      //   email: req.body.email,
      //   password: req.body.password,
      //   confirmpassword: req.body.confirmpassword,
      //   age: req.body.age,
      // });

      //  or
      const registerEmployee = new Register(req.body);

      const registered = await registerEmployee.save();
      res.status(201).render("index");
    } else {
      res.send("Password Not Matching");
    }
  } catch (err) {
    res.status(400).send("You are getting error!!");
  }
});

// using "promises" to take data from "registerform or postman" & save it to mongodb
// app.post("/register", (req, res) => {
//   console.log(req.body);
//   const user = new Register(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

app.get("*", (req, res) => {
  res.status(404).render("404page", {
    errmsg: "Oops!!! Page not found...😲",
  });
});

app.listen(port, () => {
  console.log(`Server started to listen on port ${port}`);
});
