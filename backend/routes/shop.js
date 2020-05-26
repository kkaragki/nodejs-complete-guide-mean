const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// / => GET
router.get('/', shopController.getIndex);

// /products => GET
router.get('/products', shopController.getProducts);

// /products/:productId => GET
router.get('/products/:productId', shopController.getProduct);

// /cart => GET
router.get('/cart', isAuth, shopController.getCart);

// /cart => POST
router.post('/cart', isAuth, shopController.postCart);

// /cart-delete-item => POST
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

// /checkout => GET
router.get('/checkout', isAuth, shopController.getCheckout);

router.get('/checkout/success', shopController.getCheckoutSuccess);
 
router.get('/checkout/cancel', shopController.getCheckout);

// /orders => GET
router.get('/orders', isAuth, shopController.getOrders);

// /orders/:orderId => GET
router.get('/orders/:orderId', isAuth, shopController.getInvoice);

module.exports = router;