var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const dotenv = require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

// Routers
const indexRouter = require("./routers/indexRouter");
const employeeRouter = require("./routers/employeeRouter");
const companyRouter = require("./routers/companyRouter");
const adminRouter = require("./routers/adminRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl:
        process.env.NODE_ENV === "production"
          ? process.env.MONGO_URI
          : process.env.MONGO_URI_DEV,
      collectionName: "sessions",
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Passport Authentication
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/user", employeeRouter);
app.use("/company", companyRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("ENV") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
