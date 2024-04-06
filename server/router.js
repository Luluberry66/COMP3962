import express from 'express';

// import modules below
import { getItems } from './controller/getItems.js';
import { testPost } from './controller/controller.js';
import { register, authenticateUser } from './controller/userController.js';


// create router
const router = express.Router();

// define routes below
router.get('/getItems', getItems);

router.post('/testPost', testPost);

router.post('/authenticateUser', authenticateUser);

router.post('/register', register);

export { router };