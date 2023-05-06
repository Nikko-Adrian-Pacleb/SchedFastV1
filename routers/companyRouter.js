const router = require("express").Router();
const companyController = require("../controllers/companyController");

// Redirect to Login page or Home page
router.get("/", companyController.company_index_get);

/// S--- Company Employee Routes --- ///
// Get list of all employees
router.get("/:companyId/employees", companyController.company_employees_get);

// Get Home page for creating a new employee
router.get(
  "/:companyId/employees/create",
  companyController.company_employee_create_get
);
// Create a new employee
router.post(
  "/:companyId/employees/create",
  companyController.company_employee_create_post
);

// Get Home page for updating an employee
router.get(
  "/:companyId/employees/:employeeId/update",
  companyController.company_employee_update_get
);
// Update an employee
router.post(
  "/:companyId/employees/:employeeId/update",
  companyController.company_employee_update_post
);

// Get Home page for deleting an employee
router.get(
  "/:companyId/employees/:employeeId/delete",
  companyController.company_employee_delete_get
);
// Delete an employee
router.post(
  "/:companyId/employees/:employeeId/delete",
  companyController.company_employee_delete_post
);
/// E--- Company Employee Routes --- ///

// Get details of a specific employee
router.get(
  "/:companyId/employees/:employeeId",
  companyController.company_employee_detail_get
);

// Get company Home Page
router.get("/:companyId", companyController.company_detail_get);

module.exports = router;
