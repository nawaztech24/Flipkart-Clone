const express = require('express');
const productController = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

//  MAIN PRODUCTS ROUTE (For You + Search + Category)
router.route('/products').get(productController.getAllProducts);

//  SECTION BASED ROUTE (Slider ke liye)
router.route('/products/section').get(productController.getProductsBySection);

// ADMIN ROUTES
router.route('/admin/products')
    .get(isAuthenticatedUser, authorizeRoles("admin"), productController.getAdminProducts);

router.route('/admin/product/new')
    .post(isAuthenticatedUser, authorizeRoles("admin"), productController.createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), productController.updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), productController.deleteProduct);

// PRODUCT DETAILS
router.route('/product/:id')
    .get(productController.getProductDetails);

// REVIEWS
router.route('/review')
    .put(isAuthenticatedUser, productController.createProductReview);

router.route('/admin/reviews')
    .get(productController.getProductReviews)
    .delete(isAuthenticatedUser, productController.deleteReview);

module.exports = router;