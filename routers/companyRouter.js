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

/// S--- Company Employee Routes --- ///
// Get list of all employees
router.get(
  "/:companyId/employees",
  companyAuth,
  companyController.company_employees_get
);

// Get Home page for creating a new employee
router.get(
  "/:companyId/employee/create",
  companyAuth,
  companyController.company_employee_create_get
);
// Create a new employee
router.post(
  "/:companyId/employee/create",
  companyAuth,
  companyController.company_employee_create_post
);

// Get Home page for updating an employee
router.get(
  "/:companyId/employee/:employeeId/update",
  companyAuth,
  companyController.company_employee_update_get
);
// Update an employee
router.put(
  "/:companyId/employee/:employeeId/update",
  companyAuth,
  companyController.company_employee_update_post
);

// Get Home page for deleting an employee
router.get(
  "/:companyId/employee/:employeeId/delete",
  companyAuth,
  companyController.company_employee_delete_get
);
// Delete an employee
router.delete(
  "/:companyId/employee/:employeeId/delete",
  companyAuth,
  companyController.company_employee_delete_post
);
// Get details of a specific employee
router.get(
  "/:companyId/employee/:employeeId",
  companyAuth,
  companyController.company_employee_detail_get
);
/// E--- Company Employee Routes --- ///

// Get company Home Page
router.get("/:companyId", companyAuth, companyController.company_detail_get);

module.exports = router;
