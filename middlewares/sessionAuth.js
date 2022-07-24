function sessionAuth(req, res, next) {
  // this variable will be available for all files
  console.log("Session check 1");
  res.locale.user = req.session.user;
  // console.log("Locale USer: ", res.locals.user);
  console.log("Session USer: ", req.session);
  /*   if (req.session.user) {
    res.locals.user = req.session.user;
    console.log("Session check 2");
    console.log("Locale USer: ", res.locals.user);
    console.log("Session USer: ", res.session);
    next();
  } else {
    console.log("-ve response");
    res.send("Failed");
  } */
  // console.log(req.session);

  next();
}

module.exports = sessionAuth;
