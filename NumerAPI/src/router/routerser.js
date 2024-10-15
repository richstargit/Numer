const express = require("express");
const { bisection } = require("../controllers/rootequation");
const { menu } = require("../controllers/menucontroller");
const router = express.Router();

router.get('/getdata',bisection);
router.get("/getmenu",menu)

module.exports = router;