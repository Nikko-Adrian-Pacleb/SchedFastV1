const router = require("express").Router();
const debug = require("debug")("app:companyRouter");

router.get("/", (req, res) => {
  debug("GET /");
  res.render("index", { title: "Index" });
});

module.exports = router;
