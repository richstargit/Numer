const express = require("express");
const { rootofequations, rootsave } = require("../controllers/rootequation");
const { menu } = require("../controllers/menucontroller");
const router = express.Router();

router.get('/root',rootofequations);
router.post('/rootsave',rootsave);

module.exports = router;