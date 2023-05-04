const router = require("express").Router();
const debug = require("debug")("app:employeeRouter");

router.get("/", (req, res) => {
  debug("GET /");
  res.render("employee_index", { title: "Employee Index" });
});

module.exports = router;
