const router = require("express").Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.employee_index_get);

module.exports = router;
