const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");
const Company = require("../models/companyModel");
const Employee = require("../models/employeeModel");

// Company Login
const companyCustomFields = {
  usernameField: "companyID",
  passwordField: "companyPassword",
  passReqToCallback: true,
};
const companyVerifyCallback = async (req, companyID, companyPassword, done) => {
  const company = await Company.findOne({
    companyCode: req.body.companyCode,
    companyID: companyID,
  }).then((company) => {
    if (!company) {
      return done(null, false, { message: "Incorrect username." });
    }
    // V Bad Code
    if (company.companyPassword !== companyPassword) {
      return done(null, false, { message: "Incorrect password." });
    }
    // !!! Implement a bcrypt compare here
    // if (!company.validPassword(password)) {
    //   return done(null, false, { message: "Incorrect password." });
    // }
    return done(null, company);
  });
};
const companyStrategy = new LocalStrategy(
  companyCustomFields,
  companyVerifyCallback
);
passport.use("company", companyStrategy);

// Employee Login

// Deserializing and Serializing
passport.serializeUser((account, done) => {
  done(null, account.id);
});
passport.deserializeUser((id, done) => {
  const company = Company.findById(id);
  const employee = Employee.findById(id);
  if (company) {
    done(null, company);
  } else if (employee) {
    done(null, employee);
  }
});
