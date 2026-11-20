/////// app.js

const path = require("node:path");
const pool = require("./db/pool.js"); // postgress pool connector
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const passportStrategy = require("./auth/passportStrategy.js")
const session_controllers = require("./auth/session_funcs.js")



const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


//=========================================
passport.use('passpword',passportStrategy)



passport.serializeUser(session_controllers.serializaeUser);

passport.deserializeUser(session_controllers.deserializeUser);


//========================================

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
  if (req.session.messages){
        console.log(req.session.messages)
    }
});

app.get("/sign-up", (req,res) => {
    res.render("sign-up")
})

app.post("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post("/sign-up", async (req, res, next) => {
 try {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, hashedPassword]);
  res.redirect("/");
 } catch (error) {
    console.error(error);
    next(error);
   }
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: "true",
  })
);


app.all("/", (req,res) => {
    if (req.session.messages){
        console.log(req.session.messages)
    }
})

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

app.use(errorHandler)



app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
