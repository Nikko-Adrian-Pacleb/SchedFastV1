const passport = require("passport");

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
