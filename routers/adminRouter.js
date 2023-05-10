const router = require("express").Router();
const adminController = require("../controllers/adminController");

// // Redirect to Login page or Home page
// router.get("/", adminController.admin_index_get);

// /// S--- Admin Routers --- ///
// // Get Admin Login page
// router.get("/login", adminController.admin_login_get);
// // Login an admin
// router.post("/login", adminController.admin_login_post);
// // Get admin Home Page
// router.get("/account", adminController.admin_account_get);
// // Register Admin
// router.get("/register", adminController.admin_register_get);
// router.post("/register", adminController.admin_register_post);
// // Logout Admin
// router.get("/logout", adminController.admin_logout_get);

/// S--- Admin Company Routes --- ///
// Get Home page for creating a new company
router.get("/account/company/create", adminController.create_company_get);
// Create a new company
router.post("/account/company/create", adminController.create_company_post);

module.exports = router;
