// Middleware to protect routes
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is logged in, proceed to the route
  }
  // User is not logged in
  res.redirect("/"); // Or res.status(401).send("Unauthorized") for API endpoints
}

// Optional: Redirect already-logged-in users away from login/sign-up pages
function forwardAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
}