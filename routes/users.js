var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/artists/", (req, res, next) => {
  const artist = req.body.title;

  res.render(artist);
});

module.exports = router;
