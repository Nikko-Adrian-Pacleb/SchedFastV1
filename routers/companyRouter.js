const router = require("express").Router();
const companyController = require("../controllers/companyController");
const companyAuth = require("../config/authMiddleware").companyAuth;

// Redirect to Login page or Home page
router.get("/", companyController.company_index_get);

/// S--- Company Routers --- ///
// Get Company Login page
router.get("/login", companyController.company_login_get);
// Login a company
router.post("/login", companyController.company_login_post);
// Get company Home Page
router.get("/account", companyAuth, companyController.company_account_get);
// Register Company
router.get("/register", companyController.company_register_get);
router.post("/register", companyController.company_register_post);
// Logout Company
router.get("/logout", companyController.company_logout_get);

/// S--- Company Employee Routes --- ///
// Get Home page for creating a new employee
router.get(
  "/account/employee/create",
  companyAuth,
  companyController.company_employee_create_get
);
// Create a new employee
router.post(
  "/account/employee/create",
  companyAuth,
  companyController.company_employee_create_post
);

// Get Home page for updating an employee
router.get(
  "/account/employee/:employeeId/update",
  companyAuth,
  companyController.company_employee_update_get
);
// Update an employee
router.put(
  "/account/employee/:employeeId/update",
  companyAuth,
  companyController.company_employee_update_post
);

// Get Home page for deleting an employee
router.get(
  "/account/employee/:employeeId/delete",
  companyAuth,
  companyController.company_employee_delete_get
);
// Delete an employee
router.delete(
  "/account/employee/:employeeId/delete",
  companyAuth,
  companyController.company_employee_delete_post
);
// Get details of a specific employee
router.get(
  "/account/employee/:employeeId",
  companyAuth,
  companyController.company_employee_detail_get
);
// Get list of all employees
router.get(
  "/account/employees",
  companyAuth,
  companyController.company_employees_get
);
/// E--- Company Employee Routes --- ///

module.exports = router;
