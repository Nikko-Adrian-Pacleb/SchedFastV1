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
  console.log("companyVerifyCallback");
  console.log(companyID, companyPassword, req.body.companyCode);
  const company = await Company.findOne({
    CompanyCode: req.body.companyCode,
    CompanyID: companyID,
  });
  console.log(company);
  if (!company) {
    return done(null, false);
  }
  // V Bad Code
  if (company.CompanyPassword !== companyPassword) {
    return done(null, false);
  }
  // !!! Implement a bcrypt compare here
  console.log(company);
  return done(null, company);
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
passport.deserializeUser(async (id, done) => {
  const company = await Company.findById(id);
  const employee = await Employee.findById(id);
  // console.log(company);
  console.log(company.CompanyName);
  if (company) {
    done(null, company);
  } else if (employee) {
    done(null, employee);
  }
});
