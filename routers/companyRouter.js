const router = require("express").Router();
const debug = require("debug")("app:companyRoutes");

router.get("/", (req, res) => {
  debug("GET /");
  res.render("company_index", { title: "Company Index" });
});

module.exports = router;
