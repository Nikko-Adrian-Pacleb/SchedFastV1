const router = require("express").Router();
const companyController = require("../controllers/companyController");

router.get("/", companyController.company_index_get);

module.exports = router;
