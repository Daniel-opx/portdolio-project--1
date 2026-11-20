const { Router } = require("express");
const pool = require("../db/pool")
const userRouter = Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");


userRouter.get("/", (req, res) => {
  res.render("index", { user: req.user });
  if (req.session.messages){
        console.log(req.session.messages)
    }
});

userRouter.get("/sign-up", (req,res) => {
    res.render("sign-up")
})

userRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  })
);

userRouter.post("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

userRouter.post("/sign-up", async (req, res, next) => {
 try {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, hashedPassword]);
  res.redirect("/");
 } catch (error) {
    console.error(error);
    next(error);
   }
});

module.exports = userRouter