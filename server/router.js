import express from 'express';
// import modules below
import { getItems } from './controller/getItems.js';
import { testPost } from './controller/controller.js';


// create router
const router = express.Router();

// define routes below
router.get('/getItems', getItems);
router.post('/testPost', testPost);


export { router };