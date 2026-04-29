const express = require('express');

const { 
  newOrder, 
  getSingleOrderDetails, 
  myOrders, 
  getAllOrders, 
  updateOrder, 
  deleteOrder,
  cancelOrder 
} = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrderDetails);

router.route('/orders/me').get(isAuthenticatedUser, myOrders);


router.route('/order/:id/cancel').put(isAuthenticatedUser, cancelOrder);

// ADMIN
router.route('/admin/orders')
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;