const Company = require("../models/companyModel");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

exports.create_company_get = (req, res) => {
  res.render("create_company", { title: "Company Register" });
};

exports.create_company_post = [
  body("CompanyID", "Company ID required").trim().isLength({ min: 1 }),
  body("CompanyPassword", "Company password required")
    .trim()
    .isLength({ min: 1 }),
  body("CompanyName", "Company name required").trim().isLength({ min: 1 }),
  asynchandler(async (req, res, next) => {
    const { CompanyID, CompanyPassword, CompanyName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("create_company", {
        title: "Company Register",
        errors: errors.array(),
      });
      return;
    }

    const cryptedPassword = await bcrypt.hash(CompanyPassword, 10);

    const newCompany = new Company({
      CompanyID: CompanyID,
      CompanyPassword: cryptedPassword,
      CompanyName: CompanyName,
    });
    await newCompany.save();
    res.redirect("/company/login");
  }),
];
