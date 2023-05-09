const passport = require("passport");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const Company = require("../models/companyModel");

exports.company_index_get = (req, res) => {
  res.render("company_index", { title: "Company Index" });
};

exports.company_account_get = (req, res) => {
  res.send(req.user);
};

exports.company_login_get = (req, res) => {
  res.render("company_login", { title: "Company Login", message: {} });
};
exports.company_login_post = passport.authenticate("company", {
  successRedirect: "/company/account",
  failureRedirect: "/company/login",
});

exports.company_register_get = (req, res) => {
  res.render("company_register", { title: "Company Register", errors: false });
};
exports.company_register_post = [
  body("CompanyID", "Company ID required").trim().isLength({ min: 1 }),
  body("CompanyPassword", "Company password required")
    .trim()
    .isLength({ min: 1 }),
  body("CompanyName", "Company name required").trim().isLength({ min: 1 }),
  asynchandler(async (req, res, next) => {
    const { CompanyID, CompanyPassword, CompanyName } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("company_register", {
        title: "Company Register",
        errors: errors.array(),
      });
      return;
    }

    const company = await Company.findOne({ CompanyID: CompanyID });
    if (company) {
      res.render("company_register", {
        title: "Company Register",
        errors: [{ msg: "Company already exists" }],
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(CompanyPassword, 10);

    const newCompany = new Company({
      CompanyID: CompanyID,
      CompanyPassword: hashedPassword,
      CompanyName: CompanyName,
    });
    await newCompany.save();
    res.redirect("/company/login");
  }),
];

exports.company_logout_get = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  res.redirect("/company/login");
};

exports.company_employees_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Company Employees GET");
};

exports.company_employee_detail_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Company Employee Detail GET");
};

exports.company_employee_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Company Employee Create GET");
};
exports.company_employee_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Company Employee Create POST");
};

exports.company_employee_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Company Employee Update GET");
};
exports.company_employee_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Company Employee Update POST");
};

exports.company_employee_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Company Employee Delete GET");
};
exports.company_employee_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Company Employee Delete POST");
};
