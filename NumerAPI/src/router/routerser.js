const express = require("express");
const { rootofequations, rootsave, linear, linearsave, inter, intersave } = require("../controllers/api");
const router = express.Router();

router.get('/root',rootofequations);
router.post('/rootsave',rootsave);
router.get('/linear',linear);
router.post('/linearsave',linearsave);
router.get('/inter',inter);
router.post('/intersave',intersave);

module.exports = router;