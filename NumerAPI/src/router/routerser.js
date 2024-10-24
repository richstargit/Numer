const express = require("express");
const { rootofequations, rootsave, linear } = require("../controllers/api");
const router = express.Router();

router.get('/root',rootofequations);
router.post('/rootsave',rootsave);
router.get('/linear',linear);

module.exports = router;