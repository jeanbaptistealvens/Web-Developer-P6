const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauces')
const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config'); 

router.get('/', auth, sauceCtrl.displayAllSauce);
router.post('/', auth, multer, sauceCtrl.createSauce); 
router.get('/:id', auth, sauceCtrl.displayOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.post('/:id/like', auth, sauceCtrl.sauceLike)

module.exports = router;