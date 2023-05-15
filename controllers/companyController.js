const passport = require("passport");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const Company = require("../models/companyModel");
const Employee = require("../models/employeeModel");
const mongoose = require("mongoose");

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

/// S-Company Employee Routes ///
exports.company_employees_get = (req, res) => {
  const company = req.user;
  res.send(company.CompanyEmployees);
};

exports.company_employee_detail_get = asynchandler(async (req, res) => {
  // Get company and employee
  const company = req.user;
  const employee = await Employee.findById(req.params.employeeId);

  // Check if employee exists
  if (!employee) {
    res.send("Employee not found");
    return;
  }

  // Check if employee belongs to company
  if (employee.EmployeeCompany.toString() != company._id.toString())
    res.send("Employee not found");
  else res.send(employee); // Send employee
});

exports.company_employee_create_get = (req, res) => {
  res.render("company_employee_create", {
    title: "Create Employee",
    errors: false,
    company: req.user,
  });
};
exports.company_employee_create_post = [
  body("EmployeeCompany", "Employee Company ID required")
    .trim()
    .isLength({ min: 1 }),
  body("EmployeePosition", "Employee Position required")
    .trim()
    .isLength({ min: 1 }),
  body("EmployeeCompanyID", "Employee Company Code required")
    .trim()
    .isLength({ min: 1 }),
  body("EmployeeID", "Employee ID required").trim().isLength({ min: 1 }),
  body("EmployeePin", "Employee Pin required").trim().isLength({ min: 1 }),
  body("EmployeeFirstName", "Employee First Name required")
    .trim()
    .isLength({ min: 1 }),
  body("EmployeeLastName", "Employee Last Name required")
    .trim()
    .isLength({ min: 1 }),
  asynchandler(async (req, res, next) => {
    const {
      EmployeeCompany,
      EmployeeCompanyID,
      EmployeePosition,
      EmployeeID,
      EmployeePin,
      EmployeeFirstName,
      EmployeeLastName,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("company_employee_create", {
        title: "Create Employee",
        company: req.user,
        errors: errors.array(),
      });
      return;
    }
    const EmployeeCompany_id = mongoose.Types.ObjectId(EmployeeCompany);
    const company = await Company.findById(EmployeeCompany_id).populate(
      "CompanyEmployees"
    );
    if (!company) {
      res.render("company_employee_create", {
        title: "Create Employee",
        company: req.user,
        errors: [{ msg: "Company does not exist" }],
      });
      return;
    }

    for (let i = 0; i < company.CompanyEmployees.length; i++) {
      const CompanyEmployeesi_id = mongoose.Types.ObjectId(
        company.CompanyEmployees[i]
      );
      const employee = await Employee.findById(CompanyEmployeesi_id);
      if (employee.EmployeeID == EmployeeID) {
        res.render("company_employee_create", {
          title: "Create Employee",
          company: req.user,
          errors: [{ msg: "Employee already exists" }],
        });
        return;
      }
    }

    const newEmployee = new Employee({
      EmployeeCompany: EmployeeCompany,
      EmployeePosition: EmployeePosition,
      EmployeeCompanyID: EmployeeCompanyID,
      EmployeeID: EmployeeID,
      EmployeePin: EmployeePin,
      EmployeeFirstName: EmployeeFirstName,
      EmployeeLastName: EmployeeLastName,
    });
    company.CompanyEmployees.push(newEmployee);
    await newEmployee.save();
    await company.save();
    res.redirect(`/company/account/employee/${newEmployee._id}`);
  }),
];

exports.company_employee_update_get = asynchandler(async (req, res) => {
  const company = req.user;
  const employee = await Employee.findById(req.params.employeeId);
  if (!employee) res.redirect("/company/account/employees");

  res.render("company_employee_update", {
    title: "Update Employee",
    errors: false,
    company: company,
    employee: employee,
  });
});

exports.company_employee_update_post = [
  body("EmployeePosition", "Employee Position required")
    .trim()
    .isLength({ min: 1 }),
  body("EmployeeID", "Employee ID required").trim().isLength({ min: 1 }),
  body("EmployeeFirstName", "Employee First Name required")
    .trim()
    .isLength({ min: 1 }),
  body("EmployeeLastName", "Employee Last Name required")
    .trim()
    .isLength({ min: 1 }),
  asynchandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("company_employee_update", {
        title: "Update Employee",
        company: req.user,
        errors: errors.array(),
      });
      return;
    }

    const updateFields = {
      EmployeePosition: req.body.EmployeePosition,
      EmployeeID: req.body.EmployeeID,
      EmployeeFirstName: req.body.EmployeeFirstName,
      EmployeeLastName: req.body.EmployeeLastName,
      _id: req.params.employeeId,
    };
    Employee.findByIdAndUpdate(
      req.params.employeeId,
      updateFields,
      {},
      (err, theemployee) => {
        console.log(theemployee);
        if (err) return next(err);
      }
    );

    res.redirect(`/company/account/employee/${req.params.employeeId}`);
  }),
];
exports.company_employee_delete_get = asynchandler(async (req, res) => {
  // Get employee
  const employee = await Employee.findById(req.params.employeeId);
  res.render("company_employee_delete", {
    title: "Delete Employee",
    errors: false,
    employee: employee,
  });
});
exports.company_employee_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Company Employee Delete POST");
};
/// E-Company Employee Routes ///
