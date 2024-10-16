const express = require("express");
const { rootofequations, rootsave } = require("../controllers/rootequation");
const router = express.Router();

router.get('/root',rootofequations);
router.post('/rootsave',rootsave);

module.exports = router;