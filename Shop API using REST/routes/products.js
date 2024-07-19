const express = require('express');
const router = express.Router();


const checkAuths = require('../middlewares/checkAuth')
const productController = require('../controllers/products');

//Works well
router.get('/',checkAuths, productController.productGet);

//Works well
router.post("/",checkAuths, productController.productPost);

//Works well
router.get("/:productsId",checkAuths, productController.productGetOne);

//Works well
router.patch("/:productsId",checkAuths, productController.productPatch);

//Works well
router.delete("/:productsId",checkAuths, productController.productDelete);

module.exports = router;