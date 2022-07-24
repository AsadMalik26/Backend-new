var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var sessions = require("express-session");

// auth middelwares
// var sessionAuth = require("./middlewares/sessionAuth");
// var checkSessionAuth = require("./middlewares/checkSessionAuth");

const MongoDBSession = require("connect-mongodb-session")(sessions);
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var cartRouter = require("./routes/cart");
const cors = require("cors");
const config = require("config");

var app = express();
app.use(cors());

// app.use(sessionAuth);
//session middleware
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
// app.use(sessionAuth);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/* const MongoURI =
  "mongodb+srv://Asadm26:OpenCode.mdbA26@clustera26.zhmri.mongodb.net/JQAPI?retryWrites=true&w=majority";
 */
// const MongoURI = "mongodb://localhost/OfflineProductsDB";
mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected with mongodb - New Backend"))
  .catch((err) => console.log(err.message));

const sessionStore = MongoDBSession({
  uri: config.get("db"),
  collectionName: "sessions",
});

/* app.use(
  session({
    secret: "keyboard cat",
    // resave: false,
    // saveUninitialized: true,
    session: sessionStore,
    cookie: { maxAge: 60000 },
  })
); */
module.exports = app;
