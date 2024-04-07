import express from 'express';

// import modules below
import { getItems } from './controller/getItems.js';
import { testPost } from './controller/controller.js';
import { register, authenticateUser } from './controller/userController.js';
import { getShoppingCart, updateShoppingCart } from './controller/checkoutController.js';


// create router
const router = express.Router();

// define routes below
router.get('/getItems', getItems);

router.post('/testPost', testPost);

router.post('/authenticateUser', authenticateUser);

router.post('/register', register);

router.get('/getShoppingCart', getShoppingCart);

router.post('/updateShoppingCart', updateShoppingCart);

export { router };