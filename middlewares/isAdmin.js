function admin(req, res, next) {
  user = req.user;
  console.log("User: ", user);
  console.log("Role: ", user.role);
  if (req.user.role != "admin")
    return res.status(403).send("Not authorized user");
  next();
}
module.exports = admin;
