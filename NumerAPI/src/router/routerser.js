const express = require("express");
const router = express.Router();
const {menu} = require("../controllers/menucontroller");
const {graphical,bisection, falseposition, onepoint, newton, secant} = require("../controllers/rootcontroller");

router.get("/menu",menu)

router.post("/graphical",graphical)

router.post("/bisection",bisection)

router.post("/falseposition",falseposition)

router.post("/onepoint",onepoint)

router.post("/newton",newton)

router.post("/secant",secant)

module.exports = router;