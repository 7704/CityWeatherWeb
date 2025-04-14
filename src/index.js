const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
require("./db/connect");
const Register = require("./models/register");
const Login = require("./models/login");
const { logLogout } = require("./models/logout");

// const port = process.env.PORT || 3000 ; ("use of enviornment variable which is used while hosting")

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// fetching static files to express application
app.use(express.static(path.join(__dirname, "../public")));

// using views directory by removing html files as used earlier
app.set("view engine", "hbs");

// using partials directory by changing views directory path
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

// routing
app.get("/", (req, res) => {
  res.render("index");
});

// Protected weather route
app.get("/weather", isAuthenticated, (req, res) => {
  res.render("weather");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// using "async-await" to take data from "registerform or postman" & save it to mongodb
app.post("/register", async (req, res) => {
  try {
    console.log("Registration request received:", req.body);

    const pswd = req.body.password;
    const cpswd = req.body.confirmpassword;

    if (pswd === cpswd) {
      // Check if email already exists
      const existingUser = await Register.findOne({ email: req.body.email });
      if (existingUser) {
        console.log("Email already registered:", req.body.email);
        return res.render("register", {
          error:
            "Email already registered. Please use a different email or login.",
          name: req.body.name,
          age: req.body.age,
        });
      }

      // Create a new Register instance with the form data
      const registerEmployee = new Register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        age: parseInt(req.body.age),
      });

      console.log("Attempting to save user:", registerEmployee);

      // Save the user to the database
      const registered = await registerEmployee.save();
      console.log("User saved successfully:", registered);

      // Redirect to login page after successful registration
      res.status(201).render("login", {
        success: "Registration successful! Please login with your credentials.",
      });
    } else {
      console.log("Password mismatch");
      res.render("register", {
        error: "Passwords do not match. Please try again.",
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      });
    }
  } catch (err) {
    console.error("Registration error:", err);

    // Handle duplicate key error specifically
    if (err.code === 11000) {
      return res.render("register", {
        error:
          "Email already registered. Please use a different email or login.",
        name: req.body.name,
        age: req.body.age,
      });
    }

    res.render("register", {
      error: "Registration failed: " + err.message,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    });
  }
});

// Login route handler
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate user
    const user = await Login.authenticateUser(email, password);

    if (user) {
      // Set user session
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      // Successful login
      res.status(200).render("index");
    }
  } catch (error) {
    // Failed login
    res.status(400).send("Invalid email or password");
  }
});

// Logout route
app.get("/logout", async (req, res) => {
  try {
    if (req.session.user) {
      // Log the logout activity
      await logLogout(req.session.user.id, req.ip, req.headers["user-agent"]);
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Error during logout");
      }
      res.redirect("/login");
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send("Error during logout");
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
