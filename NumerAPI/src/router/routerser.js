const express = require("express");
const { rootofequations, rootsave, linear, linearsave, inter, intersave, least, leastsave, integration, integrationsave, difference, differencesave } = require("../controllers/api");
const router = express.Router();

router.get('/root',rootofequations);
router.post('/rootsave',rootsave);
router.get('/linear',linear);
router.post('/linearsave',linearsave);
router.get('/inter',inter);
router.post('/intersave',intersave);
router.get('/least',least);
router.post('/leastsave',leastsave);
router.get('/integration',integration);
router.post('/integrationsave',integrationsave);
router.get('/difference',difference);
router.post('/differencesave',differencesave);

module.exports = router;