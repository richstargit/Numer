const express = require("express");
const { rootofequations, rootsave, linear, linearsave } = require("../controllers/api");
const router = express.Router();

router.get('/root',rootofequations);
router.post('/rootsave',rootsave);
router.get('/linear',linear);
router.post('/linearsave',linearsave);

module.exports = router;