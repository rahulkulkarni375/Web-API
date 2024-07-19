const express = require('express');
const router = express.Router();

const checkAuths = require('../middlewares/checkAuth');
const orderController = require('../controllers/orders');

//works well
router.get('/',checkAuths, orderController.orderGetAll);

//works well
router.post('/', checkAuths, orderController.orderPost);

//works well
router.get('/:orderId',checkAuths, orderController.orderGetOne);

//works well
router.delete('/:orderId',checkAuths, orderController.orderDelete);


module.exports = router;